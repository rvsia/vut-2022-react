const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

const { getAllMovies, getGenres, removeMovie, updateMovie, addMovie } = require("./database");

const app = express();
const PORT = 3000;

const myLogger = function (req, res, next) {
	console.log(req.method, " - ", req.url);
	next();
};

const PER_PAGE = 20;

const run = async () => {
	app.use(myLogger);
	app.use(cors());
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));

	app.get("/genres", (_req, res) => {
		return res.send(getGenres());
	});

	app.get("/movies", (req, res) => {
		const { page = 0, search, genre } = req.query;

		let results = getAllMovies({ page, search, genre });

		return res.send({
			meta: {
				page,
				perPage: PER_PAGE,
				total: results.length
			},
			results: results.slice(Number(page) * PER_PAGE, (Number(page) + 1) * PER_PAGE)
		});
	});

	app.post("/movies", (req, res) => {
		return res.send(addMovie(req.body));
	});

	app.get("/movies/:id", (req, res) => {
		return res.send(getAllMovies().find(row => row.id === Number(req.params.id)));
	});

	app.post("/movies/:id", (req, res) => {
		return res.send(updateMovie(req.params.id, req.body).find(row => row.id === Number(req.params.id)));
	});

	app.delete("/movies/:id", (req, res) => {
		return res.send(removeMovie(req.params.id));
	});

	https
		.createServer({
			key: fs.readFileSync("cert.key"),
			cert: fs.readFileSync("cert.crt"),
		}, app)
		.listen(PORT, ()=>{
			console.log("Server is Successfully Running, and App is listening on port " + PORT);
		});
};

run();
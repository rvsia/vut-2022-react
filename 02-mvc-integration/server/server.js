const express = require("express");
var cors = require("cors");

const { getAllMovies, getGenres, removeMovie } = require("./database");

const app = express();
const PORT = 3000;

const myLogger = function (req, res, next) {
	console.log(req.method, " - ", req.url, " - ");
	next();
};

const PER_PAGE = 20;

const run = async () => {
	app.use(myLogger);
	app.use(cors());

	app.get("/genres", (req, res) => {
		return res.send(getGenres());
	});

	app.get("/movies", (req, res) => {
		const { page, search, genre } = req.query;

		let results = getAllMovies({ page, search, genre });

		return res.send({
			meta: {
				page,
				perPage: PER_PAGE,
				total: results.length
			},
			results: results.slice(page, (page + 1) * PER_PAGE)
		});
	});

	app.post("/movies", (req, res) => {
		return res.send("POST HTTP method on user resource");
	});

	app.get("/movies/:id", (req, res) => {
		return res.send(getAllMovies().find(row => row.id === Number(req.params.id)));
	});

	app.put("/movies/:id", (req, res) => {
		return res.send(getAllMovies().find(row => row.id === req.params.id));
	});

	app.delete("/movies/:id", (req, res) => {
		return res.send(removeMovie(req.params.id));
	});

	app.listen(PORT, (error) => {
		if (!error) { console.log("Server is Successfully Running, and App is listening on port " + PORT); }
		else { console.log("Error occurred, server can't start", error); }
	});
};

run();
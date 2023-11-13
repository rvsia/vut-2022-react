const { database, genres } = require("./seed");

let inMemoryDatabase = [...database];

let lastId = inMemoryDatabase[inMemoryDatabase.length - 1].id;

const getAllMovies = ({ search, genre }) => {
	let result = inMemoryDatabase;

	if(search) {
		const sanitizedSearch = search.toLocaleLowerCase();
		result = result.filter(movie => movie.title.toLocaleLowerCase().includes(sanitizedSearch) || movie.plot.toLocaleLowerCase().includes(sanitizedSearch));
	}

	if(genre) {
		result = result.filter(movie => movie.genres.includes(genre));
	}

	return result;
};

const removeMovie = (id) => {
	inMemoryDatabase = inMemoryDatabase.filter((movie) => movie.id !== Number(id));

	return inMemoryDatabase;
};

const addMovie = (movie) => {
	lastId += 1;

	const newMovie = { ...movie, id: lastId };

	inMemoryDatabase.push(newMovie);

	return newMovie;
};

const updateMovie = (id, movie) => {
	inMemoryDatabase = inMemoryDatabase.map(original => original.id !== Number(id) ? original : { ...original, ...movie });

	return inMemoryDatabase;
};

const getGenres = () => {
	return genres;
};

module.exports = {
	getAllMovies,
	removeMovie,
	addMovie,
	updateMovie,
	getGenres
};

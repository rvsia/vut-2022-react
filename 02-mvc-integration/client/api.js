import axios from "axios";

export const getGenres = () => axios.get("http://localhost:3000/genres/");

export const getMovies = ({page, search, genre} = {}) => axios.get("http://localhost:3000/movies/", {
	params: {
		page, search, genre
	}
});

export const removeMovie = (id) => axios.delete(`http://localhost:3000/movies/${id}`);
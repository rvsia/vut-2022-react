import React, { useCallback, useEffect, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import "./app.css";
import { addMovie, getGenres, getMovies, removeMovie, updateMovie } from "./api";
import Card from "./Card.jsx";
import Pagination from "./Pagination.jsx";
import Gallery from "./Gallery.jsx";
import Header from "./Header.jsx";
import CardNewMovie from "./CardNewMovie.jsx";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [addingNew, addNew] = useState(false);
	const [movies, setMovies] = useState();
	const [genres, setGenres] = useState();
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState();
	const [genre, setGenre] = useState();

	useEffect(() => {
		Promise.all([getGenres(), getMovies({ page, search, genre })]).then(([{ data: genres }, { data: movies }]) => {
			setGenres(genres);
			setMovies(movies);
			setLoading(false);
		});
	}, []);

	const refreshMovies = useCallback(
		AwesomeDebouncePromise(getMovies, 200),
		[]
	);

	const deleteMovie = useCallback(
		async (id) => {
			await removeMovie(id);
			getMovies({ search, page, genre }).then(({ data }) => setMovies(data));
		},
		[search, page, genre]
	);

	const editMovie = useCallback(
		async (editedMovie) => {
			await updateMovie(editedMovie);
			getMovies({ search, page, genre }).then(({ data }) => setMovies(data));
		},
		[search, page, genre]
	);

	const addNewMovie = useCallback(
		async (newMovie) => {
			await addMovie(newMovie);
			getMovies({ search, page, genre }).then(({ data }) => setMovies(data));
		},
		[search, page, genre]
	);

	useEffect(() => {
		if (!loading) {
			refreshMovies({ search, page, genre }).then(({ data }) => setMovies(data));
		}
	}, [search, page, genre]);

	const noMoviesFound = movies?.results.length === 0 || loading;

	return (<main>
		<Header addNew={addNew}/>
		<Gallery>
			<input placeholder="Search" onChange={(e) => {
				setPage(0);
				setSearch(e.target.value);
			}} />
		</Gallery>
		{loading && <div className="spinner">Loading...</div>}
		{!loading && <div>
			<div className="genres">
				{genres.map(item => <button
					className={`genre ${genre === item ? "active" : ""}`}
					key={item}
					onClick={() => {
						setGenre(prev => prev === item ? null : item);
						setPage(0);
					}}
				>
					{item}
				</button>)}
				{!noMoviesFound && <Pagination
					page={page}
					movies={movies}
					setPage={setPage}
				/>}
			</div>
			<Gallery center>
				{addingNew && <CardNewMovie
					allGenres={genres}
					addNew={addNew}
					addMovie={addNewMovie}
				/>}
				{movies.results.map(movie => <Card
					{...movie}
					key={movie.id}
					removeMovie={deleteMovie}
					allGenres={genres}
					editMovie={editMovie}
				/>)}
				{noMoviesFound && "No movies find."}
			</Gallery>
			{!noMoviesFound && <Gallery>
				<Pagination
					page={page}
					movies={movies}
					setPage={setPage}
				/>
			</Gallery>}
		</div>}
	</main >);
};

export default App;

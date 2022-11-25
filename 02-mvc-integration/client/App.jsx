import React, { useCallback, useDeferredValue, useEffect, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import "./app.css";
import { getGenres, getMovies, removeMovie } from "./api";
import Card from "./Card.jsx";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState();
	const [genres, setGenres] = useState();
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState();
	const [genre, setGenre] = useState();

	const defferedSearch = useDeferredValue(search);

	console.log(defferedSearch);

	useEffect(() => {
		Promise.all([getGenres(), getMovies({ page, search, genre })]).then(([{ data: genres }, { data: movies }]) => {
			setGenres(genres);
			setMovies(movies);
			setLoading(false);
		});
	}, []);

	const debouncedApi = useCallback(
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

	useEffect(() => {
		if (!loading) {
			debouncedApi({ search, page, genre }).then(({ data }) => setMovies(data));
		}
	}, [search, page, genre]);

	return (<main>
		<header>
			<h1>BMD <span>Best Movie Database</span></h1>
		</header>
		<div className="gallery">
			<input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
		</div>
		{loading && <div className="spinner">Loading...</div>}
		{!loading && <div>
			<div className="genres">
				{genres.map(item => <button
					className={`genre ${genre === item ? "active" : ""}`}
					key={item}
					onClick={() => setGenre(prev => prev === item ? null : item)}
				>
					{item}
				</button>)}
			</div>
			<div className="gallery">
				page {page + 1} of {Math.ceil(movies.meta.total / 20)} showing {movies.results.length} movies out of {movies.meta.total} 
			</div>
			<div className='gallery'>
				{movies.results.map(movie => <Card
					{...movie}
					key={movie.id}
					removeMovie={deleteMovie}
				/>)}
			</div>
		</div>}
	</main >);
};

export default App;

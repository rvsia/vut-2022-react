import React from "react";

import GenreSelector from "./GenreSelector.jsx";

const CardNewMovie = ({ addNew, addMovie, allGenres }) => {
	const onSubmit = async (event) => {
		event.preventDefault();
		addNew(false);
		addMovie({
			title: event.target.title.value,
			plot: event.target.plot.value,
			posterUrl: event.target.posterUrl.value,
			genres: [...event.target.genres.children].filter(option => option.selected).map(option => option.value),
		});
	};

	return  (<form className="card" onSubmit={onSubmit}>
		<div className="container">
			<h4><input placeholder="poster url" name="posterUrl"/></h4>
			<h4><input placeholder="title" name="title" /></h4>
			<GenreSelector genres={allGenres} />
			<textarea className='description' placeholder="plot" name="plot" />
			<div className='actions'>
				<button type="submit">Add</button>
				<button onClick={() => addNew(false)}>Cancel</button>
			</div>
		</div>
	</form>);
};

export default CardNewMovie;

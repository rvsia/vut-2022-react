import React, { useState } from "react";

import GenreSelector from "./GenreSelector.jsx";

import none from "./none.jpeg";

const Card = ({ title, posterUrl, plot, genres, removeMovie, id, allGenres, editMovie }) => {
	const [isEditing, setEditing] = useState(false);

	const onSubmit = async (event) => {
		event.preventDefault();
		setEditing(false);
		editMovie({
			id,
			title: event.target.title.value,
			plot: event.target.plot.value,
			posterUrl: event.target.posterUrl.value,
			genres: [...event.target.genres.children].filter(option => option.selected).map(option => option.value),
		});
	};

	if (isEditing) {
		return (<form className="card" onSubmit={onSubmit}>
			<div className="container">
				<h4><input defaultValue={posterUrl} placeholder="poster url" name="posterUrl"/></h4>
				<h4><input placeholder="title" defaultValue={title} name="title"/></h4>
				<GenreSelector genres={allGenres} initialGenres={genres} />
				<textarea className='description' placeholder="plot" name="plot" defaultValue={plot} />
				<div className='actions'>
					<button type="submit">Save</button>
					<button onClick={() => setEditing(false)}>Cancel</button>
				</div>
			</div>
		</form>);
	}

	return (<div className="card">
		<img src={posterUrl} alt={title} onError={event => event.target.src = none} />
		<div className="container">
			<h4><b>{title}</b></h4>
			<p>{genres.join(", ")}</p>
			<p className='description'>{plot}</p>
			<div className='actions'>
				<button onClick={() => setEditing(true)}>Edit</button>
				<button onClick={() => removeMovie(id)}>Remove</button>
			</div>
		</div>
	</div>);
};

export default Card;

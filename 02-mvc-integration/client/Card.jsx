import React, { useState } from "react";

import none from "./none.jpeg";

const Card = ({ title, posterUrl, plot, genres, removeMovie, id }) => {
	const [isEditing, setEditing] = useState(false);

	if (isEditing) {
		return (<div className="card">
			<img src={posterUrl} alt={title} />
			<div className="container">
				<h4><input defaultValue={title}/></h4>
				<p>{genres.join(", ")}</p>
				<textarea className='description' defaultValue={plot} />
				<div className='actions'>
					<button>Save</button>
					<button onClick={() => setEditing(false)}>Cancel</button>
				</div>
			</div>
		</div>);
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

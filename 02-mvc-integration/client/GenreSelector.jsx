import React from "react";

const GenreSelector = ({ genres, initialGenres }) => <div>
	<select defaultValue={initialGenres} multiple name="genres">
		{genres.map(genre => (
			<option value={genre} key={genre}>{genre}</option>
		))}
	</select>
</div>;

export default GenreSelector;

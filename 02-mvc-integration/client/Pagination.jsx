import React from "react";

import { PER_PAGE } from "./constants";

const Pagination = ({page, setPage, movies}) => {
	const maxPage = Math.ceil(movies.meta.total / 20);

	const start = page * PER_PAGE;
	const end = Math.min((page + 1) * PER_PAGE, movies.meta.total);

	return (
		<div className="pagination">
			<button disabled={page === 0} onClick={() => setPage(page - 1)}>&#60;</button>
			<button disabled={(page + 1) === maxPage} onClick={() => setPage(page + 1)}>&#62;</button>
		page {page + 1} of {maxPage} showing {start} - {end} movies out of {movies.meta.total}
		</div>
	);
};

export default Pagination;

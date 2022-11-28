import React from "react";

const Header = ({addNew}) => <header>
	<h1>BMD <span>Best Movie Database</span></h1>
	<button onClick={addNew}>Add new movie</button>
</header>;

export default Header;



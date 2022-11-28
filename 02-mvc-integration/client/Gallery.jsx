import React from "react";

const Gallery = ({ children, center }) => <div className={`gallery ${center ? "center" : ""}`}>
	{children}
</div>;

export default Gallery;

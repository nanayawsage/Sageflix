import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const detailUrl = `/Movies/${movie.id}`;
  return (
    <div className="container col-lg-3 col-md-4 col-sm-auto my-4">
      <div className="row">
    <div className=""  >
      <img
        src={posterUrl}
        className="movie-img" 
        alt={movie.original_title}
      />
     <div className="card-body">
        <h5 className="card-title">{movie.original_title}</h5>
        <Link to={detailUrl} class=" text-center btn btn-outline-success">
          Show Details
        </Link>
     
    </div>
    </div>
    </div>
  </div>
);
};
export default MovieCard;

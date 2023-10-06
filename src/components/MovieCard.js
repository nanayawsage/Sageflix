import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const detailUrl = `/Movies/${movie.id}`;
  return (
    <div className="container col-lg-4 col-md-3 my-4">
      <div className="row">
     
    <div className="card">
      <img
        src={posterUrl}
        className="card-img-top"
        alt={movie.original_title}
      />
     <div className="card-body">
        <h5 className="card-title">{movie.original_title}</h5>
        <Link to={detailUrl} class="btn btn-primary">
          Show Details
        </Link>
     
    </div>
    </div>
    </div>
  </div>
);
};
export default MovieCard;

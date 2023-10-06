import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";
// import FooterCopy from "./FooterCopy";

// https://api.themoviedb.org/3/movie/343611?api_key=364477e37eaff7fbb22eaf9619ae7d93

const MovieView = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=364477e37eaff7fbb22eaf9619ae7d93`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      });
  }, [id]);

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading, Please wait a sec..." />;
    }
    if (movieDetails) {
      const posterPath = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
      const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={posterPath}
                  alt="..."
                  className="img-fluid shadow rounded"
                />
              </div>
              <div className="col-md-9">
                <h2>{movieDetails.original_title}</h2>
                <h3 className="lead">{movieDetails.overview}</h3>
                <h4>Release: {movieDetails.release_date}</h4>
                <h4>Status: {movieDetails.status}</h4>

              </div>
            </div>
            <Footer />
          </div>
         
        </>
      );
    }
  }

  return renderMovieDetails();
};

export default MovieView;

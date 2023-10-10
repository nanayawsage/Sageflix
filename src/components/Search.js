import Hero from "./Hero";
import { Link } from "react-router-dom";
import Footer from "./Footer";
// import FooterCopy from "./FooterCopy";

// My API key= 364477e37eaff7fbb22eaf9619ae7d93

// curl --request GET \
//  --url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=364477e37eaff7fbb22eaf9619ae7d93'

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const detailUrl = `/Movies/${movie.id}`;
  return (
    <div className="col-lg-3 col-md-3 col-sm-auto col-4 my-4">
      <div className="card">
        <img
          src={posterUrl}
          className="card-img-top"
          alt={movie.original_title}
        />
       <div className="card-body">
          <h5 className="card-title">{movie.original_title}</h5>
          <Link to={detailUrl} class="btn btn-outline-success">
            Show Details
          </Link>
      </div>
     
        </div>
    </div>
  );
};

const SearchView = ({ keyword, searchResults }) => {
  const title = `You are searching for ${keyword}`;

  const resultHtml = searchResults.map((obj, i) => {
    return <MovieCard movie={obj} key={i} />;
  });

  return (
    <>
      <Hero text={title} />
      {resultHtml && (
        <div className="container">
          <div className="row">{resultHtml}</div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SearchView;

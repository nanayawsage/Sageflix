import Hero from "./Hero";
import MovieCard from "./MovieCard";
// My API key= 364477e37eaff7fbb22eaf9619ae7d93

// curl --request GET \
//  --url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=364477e37eaff7fbb22eaf9619ae7d93'

const SearchView = ({ keyword, searchResults }) => {
  const title = `You are searching for ${keyword}`;

  const resultHtml = searchResults.map((obj, i) => {
    return <MovieCard movie={obj} key={i} />;
  });

  return (
    <div className="dark-page">
      <Hero text={title} />
      {resultHtml && (
        <div className="container">
          <div className="row">{resultHtml}</div>
        </div>
      )}

    </div>
  );
};

export default SearchView;

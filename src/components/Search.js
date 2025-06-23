import Hero from "./Hero";
import MovieCard from "./MovieCard";

const SearchView = ({ keyword, searchResults }) => {
  // If no keyword, show search prompt
  if (!keyword || keyword.trim() === '') {
    return (
      <div className="dark-page">
        <Hero text="Search Movies" />
        <div className="container text-center" style={{ padding: '3rem 1rem' }}>
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '2rem',
            borderRadius: '15px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#fdd700', marginBottom: '1rem' }}>
              Start typing to search movies
            </h3>
            <p style={{ color: '#b3b3b3', lineHeight: '1.6' }}>
              Type in the search bar above to instantly find movies by title, genre, or keyword.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show search results
  const title = searchResults.length > 0 
    ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${keyword}"`
    : `Searching for "${keyword}"...`;

  return (
    <div className="dark-page">
      <Hero text={title} />
      
      {searchResults.length === 0 ? (
        // Loading or no results state
        <div className="container text-center" style={{ padding: '2rem 1rem' }}>
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '2rem',
            borderRadius: '15px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
            <h3 style={{ color: '#fdd700', marginBottom: '1rem' }}>
              Searching...
            </h3>
            <p style={{ color: '#b3b3b3' }}>
              Looking for movies matching "{keyword}"
            </p>
          </div>
        </div>
      ) : (
        // Results found
        <div className="container">
          <div className="search-results-info" style={{
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#b3b3b3'
          }}>
            <p>
              {searchResults.length} movie{searchResults.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="movie-grid">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchView;
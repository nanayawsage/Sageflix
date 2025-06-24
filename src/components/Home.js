import React, { useEffect, useState, useMemo } from 'react';
import MovieCard from './MovieCard';
import { useParams } from "react-router-dom";
import Hero from './Hero';

const Home = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=364477e37eaff7fbb22eaf9619ae7d93&append_to_response=videos&sort_by=popularity.desc'
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results) {
          setMovies(data.results);
        } else {
          throw new Error('No results found');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [id]);

  // Memoize the movie cards to prevent unnecessary re-renders
  const movieCards = useMemo(() => {
    return movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }, [movies]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="dark-page">
          <Hero text="Loading Latest Movies..." />
          <div className="container">
            <div className="loading-grid">
              {/* Loading skeleton */}
              {Array.from({ length: 20 }, (_, index) => (
                <div key={index} className="loading-card">
                  <div className="loading-image"></div>
                  <div className="loading-text">
                    <div className="loading-title"></div>
                    <div className="loading-button"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="dark-page">
          <Hero text="Oops! Something went wrong" />
          <div className="container text-center" style={{ padding: '2rem' }}>
            <p style={{ color: '#ff6b6b', fontSize: '1.1rem', marginBottom: '1rem' }}>
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-outline-success"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <div className="dark-page">
          <Hero text="No Movies Found" />
          <div className="container text-center" style={{ padding: '2rem' }}>
            <p style={{ color: '#b3b3b3', fontSize: '1.1rem' }}>
              No movies available at the moment.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="dark-page">
        <Hero text="Trending Now" />
        <div className="container">
          <div className="movie-grid">
            {movieCards}
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default Home;
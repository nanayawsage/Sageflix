import React, { useEffect, useState, useMemo } from 'react';
import MovieCard from './MovieCard';
import { useParams } from "react-router-dom";
import Hero from './Hero';

const Homemovies = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('popular');

  // Movie categories
  const categories = [
    { key: 'popular', label: 'Popular Movies', icon: '🔥' },
    { key: 'top_rated', label: 'Top Rated', icon: '⭐' },
    { key: 'upcoming', label: 'Upcoming', icon: '🎬' },
    { key: 'now_playing', label: 'Now Playing', icon: '🎭' }
  ];

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?api_key=364477e37eaff7fbb22eaf9619ae7d93&page=${currentPage}&language=en-US`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results) {
          setMovies(data.results);
          setTotalPages(Math.min(data.total_pages, 500)); // TMDB has a 500 page limit
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
  }, [id, category, currentPage]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Memoize the movie cards to prevent unnecessary re-renders
  const movieCards = useMemo(() => {
    return movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }, [movies]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    const startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '0.5rem 1rem',
          margin: '0 0.25rem',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: currentPage === 1 ? 'rgba(255, 255, 255, 0.1)' : '#fdd700',
          color: currentPage === 1 ? '#666' : '#000',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
      >
        ← Previous
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            padding: '0.5rem 0.75rem',
            margin: '0 0.25rem',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: i === currentPage ? '#fdd700' : 'rgba(255, 255, 255, 0.1)',
            color: i === currentPage ? '#000' : '#fff',
            cursor: 'pointer',
            fontWeight: i === currentPage ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (i !== currentPage) {
              e.target.style.backgroundColor = 'rgba(253, 215, 0, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (i !== currentPage) {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '0.5rem 1rem',
          margin: '0 0.25rem',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: currentPage === totalPages ? 'rgba(255, 255, 255, 0.1)' : '#fdd700',
          color: currentPage === totalPages ? '#666' : '#000',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
      >
        Next →
      </button>
    );

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3rem 0',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {pages}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="dark-page">
          <Hero text="Loading Movies..." />
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

    const currentCategoryInfo = categories.find(cat => cat.key === category);
    
    return (
      <div className="dark-page">
        <Hero text={`${currentCategoryInfo?.icon} ${currentCategoryInfo?.label}`} />
        
        <div className="container">
          {/* Category Filter */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '25px',
                  backgroundColor: category === cat.key ? '#fdd700' : 'rgba(255, 255, 255, 0.1)',
                  color: category === cat.key ? '#000' : '#fff',
                  cursor: 'pointer',
                  fontWeight: category === cat.key ? 'bold' : 'normal',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (category !== cat.key) {
                    e.target.style.backgroundColor = 'rgba(253, 215, 0, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (category !== cat.key) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Page Info */}
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#b3b3b3',
            fontSize: '0.9rem'
          }}>
            <p>
              Showing page {currentPage} of {totalPages} 
              ({movies.length} movies on this page)
            </p>
          </div>

          {/* Movies Grid */}
          <div className="movie-grid">
            {movieCards}
          </div>

          {/* Pagination */}
          {totalPages > 1 && renderPagination()}
          
          {/* Go to Top Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '25px',
                backgroundColor: 'rgba(253, 215, 0, 0.2)',
                color: '#fdd700',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fdd700';
                e.target.style.color = '#000';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(253, 215, 0, 0.2)';
                e.target.style.color = '#fdd700';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              ⬆️ Back to Top
            </button>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default Homemovies;
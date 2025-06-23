import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;
  const detailUrl = `/Movies/${movie.id}`;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="movie-card-container">
      <div className="movie-image-container" style={{ position: 'relative' }}>
        {!imageLoaded && !imageError && (
          <div 
            className="image-placeholder"
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}
          >
            Loading...
          </div>
        )}
        
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            className={`movie-img ${imageLoaded ? 'loaded' : 'loading'}`}
            alt={movie.original_title || movie.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              display: imageLoaded || imageError ? 'block' : 'none',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        ) : (
          <div 
            className="no-image-placeholder"
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
              fontSize: '0.9rem',
              textAlign: 'center',
              padding: '1rem'
            }}
          >
            No Image Available
          </div>
        )}

        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div 
            className="rating-badge"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#ffd700',
              padding: '0.25rem 0.5rem',
              borderRadius: '15px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}
          >
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title" title={movie.original_title || movie.title}>
          {movie.original_title || movie.title}
        </h5>
        
        {movie.release_date && (
          <p className="release-date" style={{ 
            fontSize: '0.8rem', 
            color: '#b3b3b3', 
            margin: '0.5rem 0' 
          }}>
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}

        <Link 
          to={detailUrl} 
          className="btn btn-outline-success"
          aria-label={`View details for ${movie.original_title || movie.title}`}
        >
          Show Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
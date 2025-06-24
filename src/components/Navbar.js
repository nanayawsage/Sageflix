import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ searchText, setSearchText, onClearSearch }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    
    // Auto-navigate to search page when typing
    if (value.trim() && location.pathname !== '/Search') {
      navigate('/Search');
    }
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    } else {
      setSearchText('');
      if (location.pathname === '/Search') {
        navigate('/');
      }
    }
  };

  return (
    <nav 
      className="navbar-custom"
      style={{
        backgroundColor: '#141010',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div 
        className="container-fluid"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1rem',
          gap: '2rem'
        }}
      >
        {/* Logo Section */}
        <Link 
          to="/" 
          className="navbar-brand"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0
          }}
          onClick={() => {
            if (searchText) {
              handleClearSearch();
            }
          }}
        >
          <img 
            src="/path-to-your-logo.png" 
            alt="SageFlix" 
            className="logo"
            style={{
              maxWidth: '120px',
              height: 'auto',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </Link>

        {/* Search Bar */}
        <div
          className="search-form"
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: '1',
            maxWidth: '600px',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchText}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem 1rem 4rem',
                border: `2px solid ${isSearchFocused ? '#fdd700' : 'transparent'}`,
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1.1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: isSearchFocused 
                  ? '0 0 0 3px rgba(253, 215, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.3)' 
                  : '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            />
            
            {/* Search Icon */}
            <span
              style={{
                position: 'absolute',
                left: '1.5rem',
                color: isSearchFocused ? '#fdd700' : '#b3b3b3',
                fontSize: '1.3rem',
                transition: 'color 0.3s ease'
              }}
            >
              🔍
            </span>
            
            {/* Clear Button */}
            {searchText && (
              <button
                type="button"
                onClick={handleClearSearch}
                style={{
                  position: 'absolute',
                  right: '1.5rem',
                  background: 'none',
                  border: 'none',
                  color: '#b3b3b3',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#ff6b6b';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#b3b3b3';
                  e.target.style.transform = 'scale(1)';
                }}
                title="Clear search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Spacer to balance the layout */}
        <div style={{ width: '120px', flexShrink: 0 }} className="navbar-spacer"></div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 991.98px) {
          .container-fluid {
            gap: 1.5rem !important;
          }
          
          .logo {
            max-width: 100px !important;
          }
          
          .navbar-spacer {
            width: 100px !important;
          }
          
          .search-form {
            max-width: 400px !important;
          }
          
          .search-form input {
            font-size: 1rem !important;
            padding: 0.9rem 1.3rem 0.9rem 3.5rem !important;
          }
          
          .search-form span {
            left: 1.3rem !important;
            font-size: 1.2rem !important;
          }
          
          .search-form button {
            right: 1.3rem !important;
            width: 32px !important;
            height: 32px !important;
            font-size: 1.2rem !important;
          }
        }

        @media (max-width: 767.98px) {
          .container-fluid {
            padding: 0 1rem !important;
            gap: 1rem !important;
          }
          
          .logo {
            max-width: 80px !important;
          }
          
          .navbar-spacer {
            display: none !important;
          }
          
          .search-form {
            max-width: none !important;
          }
          
          .search-form input {
            font-size: 0.95rem !important;
            padding: 0.8rem 1.2rem 0.8rem 3.2rem !important;
          }
          
          .search-form span {
            left: 1.2rem !important;
            font-size: 1.1rem !important;
          }
          
          .search-form button {
            right: 1.2rem !important;
            width: 30px !important;
            height: 30px !important;
            font-size: 1.1rem !important;
          }
        }

        @media (max-width: 575.98px) {
          .navbar-custom {
            padding: 0.8rem 0 !important;
          }
          
          .container-fluid {
            padding: 0 0.8rem !important;
            gap: 0.8rem !important;
          }
          
          .logo {
            max-width: 70px !important;
          }
          
          .search-form input {
            font-size: 0.9rem !important;
            padding: 0.75rem 1rem 0.75rem 3rem !important;
          }
          
          .search-form span {
            left: 1rem !important;
            font-size: 1rem !important;
          }
          
          .search-form button {
            right: 1rem !important;
            width: 28px !important;
            height: 28px !important;
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .container-fluid {
            gap: 0.6rem !important;
          }
          
          .logo {
            max-width: 60px !important;
          }
          
          .search-form input {
            padding: 0.7rem 0.9rem 0.7rem 2.8rem !important;
          }
          
          .search-form span {
            left: 0.9rem !important;
          }
          
          .search-form button {
            right: 0.9rem !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
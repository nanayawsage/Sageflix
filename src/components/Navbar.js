import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../App';
import { signOut } from 'firebase/auth';

const Navbar = ({ searchText, setSearchText, onClearSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

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

  const NavLink = ({ to, children, icon, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-link-custom ${isActiveRoute(to) ? 'active' : ''}`}
      style={{
        color: isActiveRoute(to) ? '#fdd700' : '#ffffff',
        textDecoration: 'none',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: isActiveRoute(to) ? 'bold' : 'normal',
        backgroundColor: isActiveRoute(to) ? 'rgba(253, 215, 0, 0.1)' : 'transparent'
      }}
      onMouseEnter={(e) => {
        if (!isActiveRoute(to)) {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.target.style.color = '#fdd700';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActiveRoute(to)) {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#ffffff';
        }
      }}
    >
      {icon && <span style={{ fontSize: '1.1rem' }}>{icon}</span>}
      {children}
    </Link>
  );

  return (
    <>
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
            padding: '0 1rem'
          }}
        >
          {/* Logo Section */}
          <Link 
            to="/" 
            className="navbar-brand"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
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

          {/* Desktop Search Bar */}
          <div
            className="search-form-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1',
              maxWidth: '500px',
              margin: '0 2rem',
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
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: `2px solid ${isSearchFocused ? '#fdd700' : 'transparent'}`,
                  borderRadius: '25px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '1rem',
                  color: isSearchFocused ? '#fdd700' : '#b3b3b3',
                  fontSize: '1.1rem',
                  transition: 'color 0.3s ease'
                }}
              >
                🔍
              </span>
              {searchText && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: '#b3b3b3',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '0.25rem',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = '#ff6b6b';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#b3b3b3';
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div 
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <NavLink to="/" icon="🏠" onClick={handleClearSearch}>Home</NavLink>
            <NavLink to="/Homemovies" icon="🎭" onClick={handleClearSearch}>Movies</NavLink>
            <NavLink to="/About" icon="ℹ️" onClick={handleClearSearch}>About</NavLink>
            <NavLink to="/Contact" icon="📞" onClick={handleClearSearch}>Contact</NavLink>
            
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span 
                  style={{ 
                    color: '#b3b3b3', 
                    fontSize: '0.9rem',
                    marginRight: '0.5rem'
                  }}
                >
                  Welcome, {user.displayName || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  style={{
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <NavLink to="/Login" icon="🔐" onClick={handleClearSearch}>Login</NavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-toggle"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div 
          className="mobile-search"
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'none'
          }}
        >
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchText}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                border: '2px solid transparent',
                borderRadius: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#b3b3b3',
                fontSize: '1.1rem'
              }}
            >
              🔍
            </span>
            {searchText && (
              <button
                type="button"
                onClick={handleClearSearch}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#b3b3b3',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1001,
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-menu-container ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: isMobileMenuOpen ? '0' : '-350px',
          width: '320px',
          height: '100%',
          backgroundColor: '#141010',
          zIndex: 1002,
          transition: 'right 0.3s ease',
          padding: '2rem 1.5rem',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.3)',
          overflowY: 'auto'
        }}
      >
        {/* Mobile Menu Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <img 
            src="/path-to-your-logo.png" 
            alt="SageFlix" 
            style={{
              maxWidth: '100px',
              height: 'auto'
            }}
          />
          <button
            onClick={toggleMobileMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* User Info (Mobile) */}
        {user && (
          <div style={{
            backgroundColor: 'rgba(253, 215, 0, 0.1)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: '#fdd700', 
              margin: '0 0 0.5rem 0',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              Welcome back!
            </p>
            <p style={{ 
              color: '#b3b3b3', 
              margin: 0,
              fontSize: '0.85rem'
            }}>
              {user.displayName || user.email}
            </p>
          </div>
        )}

        {/* Mobile Navigation Links */}
        <nav style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem' 
          }}>
            <NavLink to="/" icon="🏠" onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}>
              Home
            </NavLink>
            <NavLink to="/Homemovies" icon="🎭" onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}>
              Movies
            </NavLink>
            <NavLink to="/About" icon="ℹ️" onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}>
              About
            </NavLink>
            <NavLink to="/Contact" icon="📞" onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}>
              Contact
            </NavLink>
          </div>
        </nav>

        {/* Mobile Auth Section */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.5rem'
        }}>
          {user ? (
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                border: 'none',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              🚪 Sign Out
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <NavLink to="/Login" icon="🔐" onClick={() => {
                setIsMobileMenuOpen(false);
                handleClearSearch();
              }}>
                Login
              </NavLink>
              <NavLink to="/SignUp" icon="📝" onClick={() => {
                setIsMobileMenuOpen(false);
                handleClearSearch();
              }}>
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1199.98px) {
          .search-form-desktop {
            max-width: 400px !important;
            margin: 0 1.5rem !important;
          }
        }

        @media (max-width: 991.98px) {
          .desktop-nav {
            gap: 0.25rem !important;
          }
          
          .nav-link-custom {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.9rem !important;
          }
          
          .search-form-desktop {
            max-width: 300px !important;
            margin: 0 1rem !important;
          }
        }

        @media (max-width: 767.98px) {
          .desktop-nav,
          .search-form-desktop {
            display: none !important;
          }
          
          .mobile-menu-toggle,
          .mobile-search {
            display: block !important;
          }
          
          .logo {
            max-width: 90px !important;
          }
        }

        @media (max-width: 575.98px) {
          .mobile-menu-container {
            width: 100% !important;
            right: ${isMobileMenuOpen ? '0' : '-100%'} !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
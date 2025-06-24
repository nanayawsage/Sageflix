import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../App";
import { signOut } from "firebase/auth";
import AuthDetails from "./AuthDetails";

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767.98);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Don't render on mobile (handled by navbar)
  if (isMobile) {
    return null;
  }

  const menuItems = [
    { path: "/", icon: "🏠", label: "Home" },
    { path: "/Homemovies", icon: "🎭", label: "Movies" },
    { path: "/About", icon: "ℹ️", label: "About" },
    { path: "/Contact", icon: "📞", label: "Contact" }
  ];

  const SideMenuItem = ({ path, icon, label, onClick }) => (
    <Link
      to={path}
      onClick={onClick}
      className={`side-menu-item ${isActiveRoute(path) ? 'active' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: isCollapsed ? '0.75rem' : '0.75rem 1rem',
        margin: '0.25rem 0',
        borderRadius: '12px',
        textDecoration: 'none',
        color: isActiveRoute(path) ? '#fdd700' : '#ffffff',
        backgroundColor: isActiveRoute(path) ? 'rgba(253, 215, 0, 0.15)' : 'transparent',
        transition: 'all 0.3s ease',
        position: 'relative',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        minHeight: '44px',
        fontSize: '0.9rem',
        fontWeight: isActiveRoute(path) ? 'bold' : 'normal'
      }}
      onMouseEnter={(e) => {
        if (!isActiveRoute(path)) {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.target.style.color = '#fdd700';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActiveRoute(path)) {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#ffffff';
        }
      }}
      title={isCollapsed ? label : ''}
    >
      <span style={{ 
        fontSize: '1.2rem',
        marginRight: isCollapsed ? '0' : '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '24px'
      }}>
        {icon}
      </span>
      {!isCollapsed && (
        <span style={{ 
          fontSize: '0.9rem',
          fontWeight: 'inherit'
        }}>
          {label}
        </span>
      )}
      {isActiveRoute(path) && (
        <div style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
          height: '60%',
          backgroundColor: '#fdd700',
          borderRadius: '2px 0 0 2px'
        }} />
      )}
    </Link>
  );

  return (
    <aside 
      className={`side-menu-container ${isCollapsed ? 'collapsed' : ''}`}
      style={{
        position: 'fixed',
        left: '0',
        top: '80px', // Account for navbar height
        height: 'calc(100vh - 80px)',
        width: isCollapsed ? '70px' : '240px',
        backgroundColor: '#141010',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 900,
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleCollapse}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '-15px',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: '#fdd700',
          border: 'none',
          color: '#000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease',
          zIndex: 1001
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Menu Header */}
      {!isCollapsed && (
        <div style={{
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{
            color: '#fdd700',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'center'
          }}>
            Navigation
          </h3>
        </div>
      )}

      {/* Menu Items */}
      <nav style={{ flex: '1' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          {menuItems.map((item) => (
            <SideMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      </nav>

      {/* Auth Section */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {user ? (
          <div>
            {!isCollapsed && (
              <div style={{
                backgroundColor: 'rgba(253, 215, 0, 0.1)',
                padding: '0.75rem',
                borderRadius: '12px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#fdd700',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  marginBottom: '0.25rem'
                }}>
                  Welcome!
                </div>
                <div style={{
                  color: '#b3b3b3',
                  fontSize: '0.75rem',
                  wordBreak: 'break-word'
                }}>
                  {user.displayName || user.email}
                </div>
              </div>
            )}
            
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                border: 'none',
                color: 'white',
                padding: isCollapsed ? '0.75rem' : '0.75rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: isCollapsed ? '1.2rem' : '0.85rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isCollapsed ? '0' : '0.5rem',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              title={isCollapsed ? 'Sign Out' : ''}
            >
              {isCollapsed ? '🚪' : '🚪 Sign Out'}
            </button>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <SideMenuItem
              path="/Login"
              icon="🔐"
              label="Login"
            />
            <SideMenuItem
              path="/SignUp"
              icon="📝"
              label="Sign Up"
            />
          </div>
        )}

        {/* AuthDetails Component */}
        <div style={{
          marginTop: '1rem',
          display: isCollapsed ? 'none' : 'block'
        }}>
          <AuthDetails />
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
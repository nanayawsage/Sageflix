import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!password.trim()) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const signIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      
      await Swal.fire({
        title: 'Welcome back!',
        text: 'You have been logged in successfully',
        icon: 'success',
        background: '#141010',
        color: '#ffffff',
        confirmButtonColor: '#fdd700',
        confirmButtonText: 'Continue'
      });
      
      navigate("/Homemovies");
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'An error occurred during login';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      
      await Swal.fire({
        title: 'Welcome!',
        text: 'You have been logged in with Google successfully',
        icon: 'success',
        background: '#141010',
        color: '#ffffff',
        confirmButtonColor: '#fdd700',
        confirmButtonText: 'Continue'
      });
      
      navigate("/Homemovies");
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  🎬
                </div>
                <h2 style={{
                  color: '#fdd700',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)'
                }}>
                  Welcome Back
                </h2>
                <p style={{
                  color: '#b3b3b3',
                  fontSize: '0.95rem',
                  margin: 0
                }}>
                  Sign in to continue your movie journey
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  backgroundColor: 'rgba(220, 53, 69, 0.1)',
                  border: '1px solid rgba(220, 53, 69, 0.3)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.5rem',
                  color: '#ff6b6b',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={signIn} style={{ marginBottom: '2rem' }}>
                {/* Email Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#fdd700';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#b3b3b3',
                      fontSize: '1.1rem'
                    }}>
                      📧
                    </span>
                  </div>
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '0.75rem 3rem 0.75rem 3rem',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#fdd700';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#b3b3b3',
                      fontSize: '1.1rem'
                    }}>
                      🔒
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#b3b3b3',
                        cursor: 'pointer',
                        fontSize: '1.1rem'
                      }}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    border: 'none',
                    borderRadius: '12px',
                    background: loading ? 
                      'linear-gradient(45deg, #888, #666)' : 
                      'linear-gradient(45deg, #fdd700, #f1c40f)',
                    color: '#000',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(253, 215, 0, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #000',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Signing In...
                    </>
                  ) : (
                    <>
                      🚀 Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '2rem 0',
                gap: '1rem'
              }}>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                }} />
                <span style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>or continue with</span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                }} />
              </div>

              {/* Social Login */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <button
                  onClick={signInWithGoogle}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.borderColor = '#db4437';
                      e.target.style.backgroundColor = 'rgba(219, 68, 55, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#db4437" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                
                <button
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.borderColor = '#1877F2';
                      e.target.style.backgroundColor = 'rgba(24, 119, 242, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Sign Up Link */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>
                  Don't have an account?{' '}
                  <Link 
                    to="/SignUp"
                    style={{
                      color: '#fdd700',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#f1c40f'}
                    onMouseLeave={(e) => e.target.style.color = '#fdd700'}
                  >
                    Create Account
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input::placeholder {
          color: #666 !important;
        }
        
        @media (max-width: 575.98px) {
          .container > .row > div {
            padding: 0 1rem !important;
          }
          
          .container > .row > div > div {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
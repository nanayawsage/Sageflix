import React, { useState } from "react";
import Hero from "./Hero";

const AboutView = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionData = [
    {
      id: "about",
      title: "About SageFlix",
      icon: "🎬",
      content: `Welcome to SageFlix, the ultimate destination for all movie enthusiasts! At SageFlix, we're passionate about bringing the magic of cinema to your fingertips. Our platform is dedicated to helping you discover, explore, and enjoy a wide range of movies from across the globe.

      Whether you're looking for the latest blockbusters, timeless classics, hidden gems, or international masterpieces, SageFlix provides you with comprehensive movie information, ratings, reviews, and much more. We leverage the power of modern technology to create an intuitive and engaging platform that makes movie discovery effortless and enjoyable.`
    },
    {
      id: "mission",
      title: "Our Mission",
      icon: "🎯",
      content: `We are on a mission to create a seamless and immersive movie browsing experience that caters to every taste and preference. We believe that movies have the power to inspire, entertain, and provoke thought.

      Our goal is to democratize movie discovery by providing equal access to information about films from all cultures, languages, and genres. We want to break down barriers and help movie lovers find their next favorite film, regardless of where it was made or when it was released.

      Through innovative features like personalized recommendations, comprehensive search capabilities, and detailed movie insights, we strive to make SageFlix the go-to platform for movie enthusiasts worldwide.`
    },
    {
      id: "vision",
      title: "Our Vision",
      icon: "🌟",
      content: `Our vision is to become the world's most trusted and comprehensive movie discovery platform, where every film lover can find exactly what they're looking for and discover movies they never knew they needed.

      We envision a future where SageFlix serves as a bridge between diverse cinematic cultures, helping to promote understanding and appreciation for films from every corner of the world. We want to be the platform that introduces you to your new favorite director, genre, or cinematic tradition.

      By continuously innovating and expanding our features, we aim to create a vibrant community of movie enthusiasts who share their passion for cinema and help each other discover amazing films.`
    },
    {
      id: "team",
      title: "Our Team",
      icon: "👥",
      content: `SageFlix is brought to you by a dedicated team of movie enthusiasts, developers, and designers who share a common passion for cinema and technology.

      Led by Godwin Kumahlor, our team combines years of experience in software development with a deep love for movies. We understand what movie lovers want because we are movie lovers ourselves.

      Our diverse team brings together expertise in web development, user experience design, data management, and film studies to create a platform that truly serves the movie community. We're constantly working to improve SageFlix and add new features that enhance your movie discovery journey.`
    }
  ];

  const features = [
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Find movies by title, genre, actor, director, or any keyword"
    },
    {
      icon: "⭐",
      title: "Detailed Ratings",
      description: "Comprehensive ratings and reviews from trusted sources"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Perfect experience across all devices and screen sizes"
    },
    {
      icon: "🎭",
      title: "Multiple Categories",
      description: "Browse popular, top-rated, upcoming, and now playing movies"
    },
    {
      icon: "🌍",
      title: "Global Content",
      description: "Discover movies from around the world in multiple languages"
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      description: "Lightning-fast search and browsing experience"
    }
  ];

  return (
    <div className="dark-page" style={{ minHeight: '100vh' }}>
      <Hero text="About SageFlix" />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Introduction Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '800px',
          margin: '0 auto 4rem auto'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            🎬
          </div>
          <h2 style={{
            color: '#fdd700',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            Your Gateway to Cinema
          </h2>
          <p style={{
            color: '#b3b3b3',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            SageFlix is more than just a movie database – it's your personal guide to the wonderful world of cinema. 
            Discover, explore, and fall in love with movies from every corner of the globe.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{
            color: '#fdd700',
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '2rem',
            fontWeight: 'bold'
          }}>
            Why Choose SageFlix?
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '2rem',
                  borderRadius: '15px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(253, 215, 0, 0.1)';
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.borderColor = 'rgba(253, 215, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h4 style={{
                  color: '#fdd700',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  {feature.title}
                </h4>
                <p style={{
                  color: '#b3b3b3',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion Section */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h3 style={{
            color: '#fdd700',
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '2rem',
            fontWeight: 'bold'
          }}>
            Learn More About Us
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {accordionData.map((item, index) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(253, 215, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <span style={{
                    fontSize: '1.5rem',
                    color: '#fdd700',
                    transform: activeAccordion === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}>
                    ▼
                  </span>
                </button>
                
                <div style={{
                  maxHeight: activeAccordion === index ? '1000px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}>
                  <div style={{
                    padding: '0 2rem 2rem 2rem',
                    color: '#b3b3b3',
                    lineHeight: '1.7',
                    fontSize: '1rem',
                    whiteSpace: 'pre-line'
                  }}>
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '3rem 2rem',
          backgroundColor: 'rgba(253, 215, 0, 0.1)',
          borderRadius: '20px',
          border: '1px solid rgba(253, 215, 0, 0.2)'
        }}>
          <h3 style={{
            color: '#fdd700',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            Ready to Start Your Movie Journey?
          </h3>
          <p style={{
            color: '#b3b3b3',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Join thousands of movie lovers who have already discovered their next favorite film on SageFlix. 
            Start exploring today!
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/Homemovies"
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#fdd700',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(253, 215, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🎬 Browse Movies
            </a>
            <a
              href="/Contact"
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: '#fdd700',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '1rem',
                border: '2px solid #fdd700',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fdd700';
                e.target.style.color = '#000';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fdd700';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📞 Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 767.98px) {
          .container {
            padding: 1rem 0.5rem !important;
          }
          
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .accordion-button {
            padding: 1rem !important;
            font-size: 1rem !important;
          }
          
          .accordion-content {
            padding: 0 1rem 1.5rem 1rem !important;
            font-size: 0.9rem !important;
          }
          
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }
          
          .cta-buttons a {
            width: 100% !important;
            max-width: 280px !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 575.98px) {
          .features-grid > div {
            padding: 1.5rem !important;
          }
          
          .cta-section {
            padding: 2rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutView;
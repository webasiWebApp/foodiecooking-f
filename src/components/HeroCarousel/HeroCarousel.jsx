import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = ({ posts }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      // Get the latest 4 posts
      const latestPosts = posts.slice(0, 4).map(post => ({
        id: post.id,
        name: post.title || 'Untitled Recipe',
        description: post.summary || post.description || 'No description available',
        image: (post.images && post.images[0]) || (post.image && post.image[0]) || post.image || 'https://via.placeholder.com/800x600?text=No+Image',
        link: `/post?id=${post.id}`
      }));
      setItems(latestPosts);
    }
  }, [posts]);

  const handleNext = () => {
    setItems(prev => [...prev.slice(1), prev[0]]);
  };

  const handlePrev = () => {
    setItems(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  const getItemStyle = (index) => {
    const isMobile = window.innerWidth <= 768;
    
    const styles = {
      width: isMobile ? '150px' : '200px',
      height: isMobile ? '200px' : '250px',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      borderRadius: '20px',
      boxShadow: '0 30px 50px #505050ff',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      display: 'inline-block',
      transition: 'all 0.5s',
      backgroundImage: `url('${items[index]?.image}')`
    };

    if (index === 0 || index === 1) {
      return {
        ...styles,
        top: 0,
        left: 0,
        transform: 'translate(0, 0)',
        width: '100%',
        height: '100%',
        borderRadius: '0px'
      };
    } else if (index === 2) {
      return { 
        ...styles, 
        left: isMobile ? '60%' : '70%',
        display: isMobile ? 'none' : 'inline-block'
      };
    } else if (index === 3) {
      return { 
        ...styles, 
        left: isMobile ? 'calc(60% + 170px)' : 'calc(70% + 220px)',
        display: isMobile ? 'none' : 'inline-block'
      };
    } else {
      return { ...styles, left: 'calc(70% + 440px)', opacity: 0 };
    }
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      overflow: 'hidden',
      width: '100vw',
      height: '100vh',
      minHeight: '500px',
      position: 'relative'
    }}>
      <style>{`
        @keyframes animate {
          from {
            opacity: 0;
            transform: translate(0, 100px);
            filter: blur(33px);
          }
          to {
            opacity: 1;
            transform: translate(0);
            filter: blur(0);
          }
        }
        .content-animate .name {
          animation: animate 1s ease-in-out 1 forwards;
        }
        .content-animate .des {
          animation: animate 1s ease-in-out 0.3s 1 forwards;
        }
        .content-animate button {
          animation: animate 1s ease-in-out 0.6s 1 forwards;
        }

        @media (max-width: 768px) {
          .hero-content {
            left: 5% !important;
            width: 90% !important;
            padding: 20px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px;
          }
          .hero-title {
            font-size: 28px !important;
          }
          .hero-description {
            font-size: 14px !important;
          }
          .hero-button {
            padding: 8px 30px !important;
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 22px !important;
          }
          .hero-description {
            font-size: 12px !important;
          }
        }
      `}</style>

      {items.length > 0 && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {items.map((item, index) => (
            <div key={item.id} style={getItemStyle(index)}>
              {index === 1 && (
                <div className="content-animate hero-content" style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10%',
                  width: '40%',
                  textAlign: 'left',
                  color: '#000000ff',
                  transform: 'translate(0, -50%)',
                  fontFamily: 'system-ui'
                }}>
                  <div className="name hero-title" style={{
                    fontSize: '50px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    opacity: 0,
                    color:"#d35a3c"
                  }}>
                    {item.name}
                  </div>
                  <div className="des hero-description" style={{
                    marginTop: '10px',
                    marginBottom: '20px',
                    opacity: 0,
                    color:"#ffffffff"
                  }}>
                    {item.description}
                  </div>
                  <button onClick={() => navigate(item.link)} className="hero-button" style={{
                    padding: '10px 50px',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    opacity: 0,
                    borderRadius: '3px',
                    backgroundColor: '#d35a3c',
                    transition: 'all 0.5s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(255, 255, 255)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#d35a3c'}
                    >
                      See More
                    </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'max-content',
          alignItems: 'center',
          textAlign: 'center',
          position: 'absolute',
          bottom: '20px'
        }}>
          <button onClick={handlePrev} style={{
            width: '40px',
            height: '35px',
            borderRadius: '8px',
            border: '2px solid #ffffffbd',
            cursor: 'pointer',
            margin: '0 5px',
            transition: '0.3s',
            background: 'rgba(77, 40, 4, 0.58)',
            color: 'white',
            padding: '0 3px 0 0'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.8)';
            e.target.style.color = '#000000';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.578)';
            e.target.style.color = 'white';
            e.target.style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1.1)'}
          >
            ◁
          </button>
          <button onClick={handleNext} style={{
            width: '40px',
            height: '35px',
            borderRadius: '8px',
            border: '2px solid #ffffffbd',
            cursor: 'pointer',
            margin: '0 5px',
            transition: '0.3s',
            background: 'rgba(77, 40, 4, 0.58)',
            color: 'white',
            padding: '0 0 0 3px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.8)';
            e.target.style.color = '#000000';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(77, 40, 4, 0.58)';
            e.target.style.color = 'white';
            e.target.style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1.1)'}
          >
            ▷
          </button>
        </div>
    </div>
  );
};

export default HeroCarousel;

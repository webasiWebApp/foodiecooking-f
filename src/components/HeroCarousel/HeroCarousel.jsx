import React, { useState } from 'react';

const HeroCarousel = () => {
  const destinations = [
    {
      name: 'Scotland',
      description: 'Experience the mystical Highlands under twilight skies and misty lochs.',
      image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin'
    },
    {
      name: 'Norway',
      description: 'Chase the Northern Lights under star-lit skies along scenic fjord roads.',
      image: 'https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin'
    },
    {
      name: 'New Zealand',
      description: 'Wander dramatic, mist-laden mountain paths that feel straight out of a dream.',
      image: 'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin'
    },
    {
      name: 'Japan',
      description: 'Discover serene mountain temples shrouded in dusk and ancient forest trails.',
      image: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin'
    }
  ];

  const [items, setItems] = useState(destinations);

  const handleNext = () => {
    setItems(prev => [...prev.slice(1), prev[0]]);
  };

  const handlePrev = () => {
    setItems(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  const getItemStyle = (index) => {
    const styles = {
      width: '200px',
      height: '250px',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      borderRadius: '20px',
      boxShadow: '0 30px 50px #505050',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      display: 'inline-block',
      transition: 'all 0.5s',
      backgroundImage: `url('${items[index].image}')`
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
      return { ...styles, left: '70%' };
    } else if (index === 3) {
      return { ...styles, left: 'calc(70% + 220px)' };
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
      `}</style>

      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {items.map((item, index) => (
            <div key={item.name} style={getItemStyle(index)}>
              {index === 1 && (
                <div className="content-animate" style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10%',
                  width: '300px',
                  textAlign: 'left',
                  color: '#eee',
                  transform: 'translate(0, -50%)',
                  fontFamily: 'system-ui'
                }}>
                  <div className="name" style={{
                    fontSize: '40px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    opacity: 0
                  }}>
                    {item.name}
                  </div>
                  <div className="des" style={{
                    marginTop: '10px',
                    marginBottom: '20px',
                    opacity: 0
                  }}>
                    {item.description}
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <button style={{
                      padding: '10px 20px',
                      border: 'none',
                      cursor: 'pointer',
                      opacity: 0,
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.673)',
                      transition: 'all 0.5s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(255, 255, 255)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.673)'}
                    >
                      See More
                    </button>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

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
            background: 'rgba(0, 0, 0, 0.578)',
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
            background: 'rgba(0, 0, 0, 0.578)',
            color: 'white',
            padding: '0 0 0 3px'
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
            ▷
          </button>
        </div>
    </div>
  );
};

export default HeroCarousel;

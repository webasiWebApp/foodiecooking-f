import React, { useState } from 'react';

const HeroCarousel = () => {
  const destinations = [
    {
      name: 'Chicken Pot Pie Casserole',
      description: '"This chicken pot pie recipe takes a little time, but it is WELL WORTH IT!! This is an all-time favorite in our family. Great on a cold winter day.',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin'
    },
    {
      name: 'Ground Beef and Potato Casserole',
      description: 'Wow! This dish is like a combination of scalloped potatoes and shepherds pie! Its so delicious and definitely comforting. This was awesome and very versatile.',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin'
    },
    {
      name: 'Arayes – Lebanese Meat-Stuffed Crispy Pita',
      description: 'Meet my latest obsession – Arayes! Pita pockets stuffed with seasoned meat kofta filling, then pan fried until crispy. ',
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin'
    },
    {
      name: 'Holiday Stuffed Sweet Potato – with bacon, pecans & sage',
      description: 'Stuffed sweet potato with holiday vibes! Baked sweet potatoes stuffed with crispy bacon, toasty pecans and swirls of browned buttered sage.',
      image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGZvb2R8ZW58MHwwfDB8fHwy',
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
      boxShadow: '0 30px 50px #505050ff',
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
                  width: '40%',
                  textAlign: 'left',
                  color: '#000000ff',
                  transform: 'translate(0, -50%)',
                  fontFamily: 'system-ui'
                }}>
                  <div className="name" style={{
                    fontSize: '50px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    opacity: 0,
                    color:"#d35a3c"
                  }}>
                    {item.name}
                  </div>
                  <div className="des" style={{
                    marginTop: '10px',
                    marginBottom: '20px',
                    opacity: 0,
                    color:"#5c1605ff"
                  }}>
                    {item.description}
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <button style={{
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

import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import logo from '/logo.png';

// Navigation data object
const navigationData = {
  logo: "Logo",
  items: [
    { type: 'link', label: 'Home', href: '/' },
    { type: 'link', label: 'About', href: '/about' },
    {
      type: 'dropdown',
      label: 'Cetegories',
      items: [
        { label: 'College Ramen', href: '/category?category=College Ramen' },
        { label: 'Healthy', href: '/category?category=Healthy' },
        { label: 'Crockpot', href: '/category?category=Crockpot' },
        { label: 'Frugal', href: '/category?category=Frugal' },
        { label: 'Sides', href: '/category?category=Sides' },
        { label: 'Tea', href: '/category?category=Tea' },
        { label: 'Smoked', href: '/category?category=Smoked' },
        { label: 'Salads', href: '/category?category=Salads' }
      ]
    },
    
    { type: 'link', label: 'Contact', href: '/contact' },
   
  ]
};

export default function ResponsiveNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <>
      <style>{`

        .nav-container {
          position: fixed;
          z-index: 99;
          width: 100%;
          background: #ffffff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .nav-wrapper {
          position: relative;
          max-width: 1300px;
          padding: 0 30px;
          height: 70px;
          line-height: 70px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .menu-btn {
          display: none;
          cursor: pointer;
          color: #000000;
        }

        .nav-links-wrapper {
          display: inline-flex;
          align-items: center;
          list-style: none;
        }

        .nav-links-wrapper li {
          list-style: none;
          position: relative;
        }

        .nav-links-wrapper li a {
          color: #000000;
          text-decoration: none;
          font-size: 18px;
          font-weight: 300;
          padding: 9px 15px;
          border-radius: 5px;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
        }

        .nav-links-wrapper li a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 5px;
          left: 50%;
          background-color: #bb5100ff;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-links-wrapper li a:hover::after {
          width: calc(100% - 30px);
        }

        .icon-link {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .mobile-item {
          display: none;
        }

        .dropdown-menu {
          position: absolute;
          background: #ffffff;
          width: 180px;
          line-height: 45px;
          top: 85px;
          opacity: 0;
          visibility: hidden;
          box-shadow: 0 6px 10px rgba(0,0,0,0.15);
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .nav-links-wrapper li:hover .dropdown-menu {
          top: 70px;
          opacity: 1;
          visibility: visible;
        }

        .dropdown-menu li {
          margin: 0;
        }

        .dropdown-menu li a {
          width: 100%;
          display: block;
          padding: 0 0 0 15px;
          font-weight: 400;
          border-radius: 0;
        }

        .dropdown-menu li a::after {
          display: none;
        }


        .close-btn {
          position: absolute;
          right: 30px;
          top: 10px;
          cursor: pointer;
        }

        @media screen and (max-width: 970px) {
          .menu-btn {
            display: block;
          }

          .nav-links-wrapper {
            position: fixed;
            height: 100vh;
            width: 100%;
            max-width: 350px;
            top: 0;
            left: ${menuOpen ? '0' : '-100%'};
            background: #ffffff;
            display: block;
            padding: 50px 10px;
            line-height: 50px;
            overflow-y: auto;
            box-shadow: 0px 15px 15px rgba(0,0,0,0.18);
            transition: all 0.3s ease;
          }

          .nav-links-wrapper::-webkit-scrollbar {
            width: 10px;
          }

          .nav-links-wrapper::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          .nav-links-wrapper::-webkit-scrollbar-thumb {
            background: #888;
          }

          .nav-links-wrapper li {
            margin: 15px 10px;
          }

          .nav-links-wrapper li a {
            padding: 0 20px;
            display: block;
            font-size: 20px;
          }

          .desktop-item {
            display: none;
          }

          .mobile-item {
            display: block;
            color: #000000;
            font-size: 20px;
            font-weight: 500;
            padding-left: 20px;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s ease;
          }

          .mobile-item:hover {
            background: #f1f1f1;
          }

          .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            padding-left: 20px;
            width: 100%;
            max-height: ${dropdownOpen ? '500px' : '0'};
            overflow: hidden;
            box-shadow: none;
            transition: all 0.3s ease;
          }

  
        }

        
      `}</style>

      <nav className="nav-container">
        <div className="nav-wrapper">
          <div className="logo">
            <a href="/"><img src={logo} alt="logo" style={{width:"100%",height:"70px"}} /></a>
          </div>
          
          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </div>

          <ul className="nav-links-wrapper">
            {menuOpen && (
              <li className="close-btn" onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </li>
            )}
            
            {navigationData.items.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <li key={index}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                );
              }
              
              if (item.type === 'icon') {
                return (
                  <li key={index}>
                    <a href={item.href} className="icon-link">
                      <Mail size={20} />
                    </a>
                  </li>
                );
              }
              
              if (item.type === 'dropdown') {
                return (
                  <li key={index}>
                    <a href="#" className="desktop-item">{item.label}</a>
                    <div 
                      className="mobile-item"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {item.label}
                    </div>
                    <ul className="dropdown-menu">
                      {item.items.map((dropItem, dropIndex) => (
                        <li key={dropIndex}>
                          <a href={dropItem.href}>{dropItem.label}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
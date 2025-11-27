import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';

// Navigation data object
const navigationData = {
  logo: "Logo",
  items: [
    { type: 'link', label: 'Home', href: '#' },
    { type: 'link', label: 'About', href: '#' },
    {
      type: 'dropdown',
      label: 'Dropdown Menu',
      items: [
        { label: 'Drop menu 1', href: '#' },
        { label: 'Drop menu 2', href: '#' },
        { label: 'Drop menu 3', href: '#' },
        { label: 'Drop menu 4', href: '#' }
      ]
    },
    {
      type: 'mega',
      label: 'Mega Menu',
      content: [
        {
          type: 'image',
          src: 'https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg',
          alt: 'Featured'
        },
        {
          type: 'links',
          header: 'Design Services',
          links: [
            { label: 'Graphics', href: '#' },
            { label: 'Vectors', href: '#' },
            { label: 'Business cards', href: '#' },
            { label: 'Custom logo', href: '#' }
          ]
        },
        {
          type: 'links',
          header: 'Email Services',
          links: [
            { label: 'Personal Email', href: '#' },
            { label: 'Business Email', href: '#' },
            { label: 'Mobile Email', href: '#' },
            { label: 'Web Marketing', href: '#' }
          ]
        },
        {
          type: 'links',
          header: 'Security services',
          links: [
            { label: 'Site Seal', href: '#' },
            { label: 'VPS Hosting', href: '#' },
            { label: 'Privacy Seal', href: '#' },
            { label: 'Website design', href: '#' }
          ]
        }
      ]
    },
    { type: 'link', label: 'Feedback', href: '#' },
    { type: 'icon', label: 'Email', icon: 'mail', href: '#' }
  ]
};

export default function ResponsiveNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          margin: 0;
          padding: 0;
        }

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

        .logo a {
          color: #000000;
          font-size: 30px;
          font-weight: 600;
          text-decoration: none;
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
          font-weight: 500;
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
          background-color: #000000;
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

        .mega-box {
          position: absolute;
          left: 0;
          width: 100%;
          padding: 0 30px;
          top: 85px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .nav-links-wrapper li:hover .mega-box {
          top: 70px;
          opacity: 1;
          visibility: visible;
        }

        .mega-content {
          background: #ffffff;
          padding: 25px 20px;
          display: flex;
          width: 100%;
          justify-content: space-between;
          box-shadow: 0 6px 10px rgba(0,0,0,0.15);
          border-radius: 5px;
        }

        .mega-row {
          width: calc(25% - 30px);
          line-height: 45px;
        }

        .mega-row img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }

        .mega-row header {
          color: #000000;
          font-size: 20px;
          font-weight: 500;
        }

        .mega-links {
          margin-left: -40px;
          border-left: 1px solid rgba(0,0,0,0.09);
          list-style: none;
        }

        .mega-links li {
          padding: 0 20px;
        }

        .mega-links li a {
          padding: 0 20px;
          color: #666666;
          font-size: 17px;
          display: block;
        }

        .mega-links li a::after {
          display: none;
        }

        .mega-links li a:hover {
          color: #000000;
        }

        .menu-btn {
          color: #000000;
          font-size: 20px;
          cursor: pointer;
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

          .mega-box {
            position: static;
            opacity: 1;
            visibility: visible;
            padding: 0 20px;
            max-height: ${megaOpen ? '1000px' : '0'};
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .mega-content {
            box-shadow: none;
            flex-direction: column;
            padding: 20px 20px 0 20px;
          }

          .mega-row {
            width: 100%;
            margin-bottom: 15px;
            border-top: 1px solid rgba(0,0,0,0.08);
          }

          .mega-row:nth-child(1),
          .mega-row:nth-child(2) {
            border-top: 0;
          }

          .mega-links {
            border-left: 0;
            padding-left: 15px;
          }

          .mega-links li {
            margin: 0;
          }

          .mega-row header {
            font-size: 19px;
          }
        }

        
      `}</style>

      <nav className="nav-container">
        <div className="nav-wrapper">
          <div className="logo">
            <a href="#">{navigationData.logo}</a>
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
              
              if (item.type === 'mega') {
                return (
                  <li key={index}>
                    <a href="#" className="desktop-item">{item.label}</a>
                    <div 
                      className="mobile-item"
                      onClick={() => setMegaOpen(!megaOpen)}
                    >
                      {item.label}
                    </div>
                    <div className="mega-box">
                      <div className="mega-content">
                        {item.content.map((section, secIndex) => (
                          <div key={secIndex} className="mega-row">
                            {section.type === 'image' ? (
                              <img src={section.src} alt={section.alt} />
                            ) : (
                              <>
                                <header>{section.header}</header>
                                <ul className="mega-links">
                                  {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                      <a href={link.href}>{link.label}</a>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }
              
              return null;
            })}
          </ul>
          
          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </div>
        </div>
      </nav>

     
    </>
  );
}
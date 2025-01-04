import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import BurgerMenu from '../images/icons/burgarmenu.svg';
// import DownArrow from '../images/icons/DownArrow.svg';
import Expand from '../images/icons/Expand.svg';
import Collapse from '../images/icons/Collapse.svg';

import Logo from '../images/Krishna_builders.png';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  subMenu?: { name: string; href: string }[];
}

const MainMenu: NavigationItem[] = [
  { name: 'Properties', href: '/properties', current: false },
  { name: 'Valuation', href: '/valuation', current: false },
  { name: 'Our Services', href: '/property-services', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

const BurgarMenu: NavigationItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Properties', href: '/properties', current: false },
  { name: 'Valuation', href: '/valuation', current: false },
  {
    name: 'Our Services',
    href: '/property-services',
    current: false,
    subMenu: [
      { name: '1 BHK Construction', href: '/1BHKConstructionService' },
      { name: '2 BHK Construction', href: '/2BHKConstructionService' },
      { name: '3 BHK Construction', href: '/3BHKConstructionService' },
      { name: 'Estimation', href: '/Estimation' },
      { name: 'Commercial Building Construction', href: '/Commercial Building Construction' },
      { name: 'Elevation Works', href: '/ElevationWorks' },
      { name: 'Interior Work', href: '/InteriorWork' },
    ],
  },
  { name: 'Our Builders', href: '/our-builders', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function Header() {
  const location = useLocation();
  const isActivePage = location.pathname;
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<NavigationItem | null>(null);
  const handleClose = () => {
    setShow(false);
    setShowSubMenu(false);
    setActiveSubMenu(null);
  };
  const handleShow = () => setShow(true);
  const handleSubMenuClick = (item: NavigationItem) => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const element = document.getElementById("submenu-active");  //offcanvas-header
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
    if (activeSubMenu === item) {
      setTimeout(() => {
        const element = document.getElementById("offcanvas-header");
        if (element) {
          element.scrollTop = 0;
        }
      }, 100);
      setShowSubMenu(false);
      setActiveSubMenu(null);
    } else {
      setShowSubMenu(true);
      setActiveSubMenu(item);
    }
  };

  return (
    <>
      <div className="header-container fixed ">
        <Link to='/'><img src={Logo} className="logo" alt="krishna builders" /></Link>
        <ul className='menus d-none d-lg-flex'>
          {MainMenu.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className={isActivePage === item.href ? 'active' : ''}>
                {item.name}
              </Link>
            </li>
          ))}
          <img src={BurgerMenu} alt="Burger Menu" onClick={handleShow} />
        </ul>
        <img src={BurgerMenu} className='d-block d-lg-none' alt="Burger Menu" onClick={handleShow} />
      </div>
      <Offcanvas id="offcanvas-header" show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton className="custom-offcanvas-header"></Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='offcanvas-menus'>
            {BurgarMenu.map((item) => (
              <li key={item.name} id={isActivePage === item.href ? "submenu-active" : ""} >
                <Link to={item.href} className={isActivePage === item.href ? 'active' : ''} onClick={handleClose}>
                  {item.name}
                </Link>
                {item.subMenu && (
                  <span className='accordion-symbol' onClick={() => handleSubMenuClick(item)}>
                    <img className={`dd-trigger ${showSubMenu && activeSubMenu === item ? 'active' : ''}`} src={showSubMenu && activeSubMenu === item ? Collapse : Expand} alt="Downarrow" />
                  </span>
                )}

                <ul id={"showMenu"} className={`submenu ${showSubMenu && activeSubMenu === item ? 'show' : ''}`}>
                  {item.subMenu && (
                    item.subMenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link to={subItem.href} onClick={handleClose} >{subItem.name}</Link>
                      </li>
                    ))
                  )}
                </ul>
              </li>
            ))}
          </ul>
          <div className="book-now-btn">
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Get a Quote</a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
}

export default Header;

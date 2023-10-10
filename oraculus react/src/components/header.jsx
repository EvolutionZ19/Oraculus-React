import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo-oraculus.png';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';



function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" className='logo' />
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/about">A Propos</NavLink>
          </li>
        </ul>
      </nav>
      <div className="arrow">
        <a className="arrow-left" href="#"><FontAwesomeIcon icon={faChevronLeft} /></a>
        <a className="arrow-right" href="#"><FontAwesomeIcon icon={faChevronRight} /></a>
      </div>
    </header>
  );
}

export default Header;

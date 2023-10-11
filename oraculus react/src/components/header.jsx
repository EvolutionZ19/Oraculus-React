import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo-oraculus.png';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  const { currentIndex, onIndexChange, horoscopeData, onArrowClick } = props;

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      const newIndex = currentIndex <= 1 ? horoscopeData.length : currentIndex - 1;
      onIndexChange(newIndex);
    } else if (direction === 'right') {
      const newIndex = currentIndex >= horoscopeData.length ? 1 : currentIndex + 1;
      onIndexChange(newIndex);
    }

    // Utilisez la fonction onArrowClick pour gérer le clic sur les flèches
    function onArrowClick() {
      let newIndex = currentIndex;

      if (direction === 'left') {
          newIndex = newIndex <= 1 ? horoscopeData.length : newIndex - 1;
      } else if (direction === 'right') {
          newIndex = newIndex >= horoscopeData.length ? 1 : newIndex + 1;
      }

      onIndexChange(newIndex);
    }
  };

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
        <a className="arrow-left" href="#" onClick={() => handleArrowClick('left')}><FontAwesomeIcon icon={faChevronLeft} /></a>
        <a className="arrow-right" href="#" onClick={() => handleArrowClick('right')}><FontAwesomeIcon icon={faChevronRight} /></a>
      </div>
    </header>
  );
}

export default Header;

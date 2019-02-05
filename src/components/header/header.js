import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = ({ onServiceChange, isLoggedIn }) => {
  const loginLinkItem = isLoggedIn ? null : <li><Link to="/login">Login</Link></li>;

  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">Star DB</Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/people/">People</Link>
        </li>
        <li>
          <Link to="/planets/">Planets</Link>
        </li>
        <li>
          <Link to="/starships/">Starships</Link>
        </li>
        {loginLinkItem}
        <li>
          <Link to="/secret">Secret</Link>
        </li>
      </ul>
      <button className="btn btn-primary btn-sm" onClick={onServiceChange}>
        Change Service
      </button>
    </div>
  );
};

export default Header;
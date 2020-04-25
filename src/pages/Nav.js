import React from 'react';
//import '../App.css'
import { Link } from 'react-router-dom'

function Nav() {

  const navstyle = {
    color: 'while'
  };

  return (
      <nav>
          <h3>Logo</h3>
          <ul className="nav-link">
              <Link style={navstyle} to='/login'>
                <li>login</li>
              </Link>
              <Link style={navstyle} to='/ghost'>
                <li>ghost</li>
              </Link>
              <Link style={navstyle} to='/ghost2'>
                <li>ghost2</li>
              </Link>

          </ul>
      </nav>
  );
}

export default Nav;
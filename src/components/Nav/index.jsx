import React from 'react'
import Brand from './brand'
import './index.css';

const Nav = () => {
return (
<nav className="mobile-only">
    <Brand />
    <ul className="navbar-list">
        <li className="navbar-item">
            <a href="#" className="navbar-link">
                Sign In
            </a>
        </li>
        <li className="navbar-link-item">
            <a href="#" className="navbar-link">
                Try Demo    
            </a>
        </li>
    </ul>
</nav>    
)}

export default Nav;

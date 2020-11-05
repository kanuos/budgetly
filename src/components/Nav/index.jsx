import React from 'react'
import Brand from './brand'
import './index.css';

const Nav = () => {

let user = [true, false][(Math.floor(Math.random() * 2))];

return (
<nav className="mobile-only">
    <Brand />
    <ul className="navbar-list">
        {user ?
        <>
        <li className="navbar-item">
            <a href="#" className="navbar-link">
                dashboard
            </a>
        </li>
        <li className="navbar-link-item">
            <a href="#" className="navbar-link">
                log out   
            </a>
        </li>
        </>
        :

        <li className="navbar-link-item">
            <a href="#" className="navbar-link">
                Try Demo    
            </a>
        </li>}
    </ul>
</nav>    
)}

export default Nav;

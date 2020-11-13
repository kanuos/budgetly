import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Brand from './brand'
import './index.css';
import exit from '../../assets/exit.svg';
import add from '../../assets/new.svg';

const Nav = () => {
    const [navOpen, setNav] = useState(false);
    function toggleNav() {
        setNav(() => !navOpen);
    }

    return (
    <nav className="mobile-only">
        <Link to="/">
            <Brand />
        </Link>
        <ul className="navbar-list">
            <li className="navbar-link-item navbar-toggler" onClick={toggleNav}>
                &equiv;   
            </li>
        </ul>
        <ul className={`navbar-list--alt ${navOpen ? "nav-open":"nav-close"}`}>
            <button className="nav-list-close" onClick={toggleNav}>&times;</button>
            <li>
                <Link to="/" className="nav-brand--alt">
                    <Brand />
                </Link>
            </li>
            <li>
                <Link 
                    to={{
                        pathname : "/",
                        signIn : true
                    }} 
                className="nav-item">
                    <img
                        src={exit} 
                        alt="exit"/>
                        sign in
                </Link>
            </li>
            <li>
                <Link 
                    to={{
                        pathname : "/",
                        signIn : false
                    }} 
                    className="nav-item">
                    <img
                        src={add} 
                        alt="exit"/>
                        register
                </Link>
            </li>
        </ul> 
    </nav>
)}

export default Nav;

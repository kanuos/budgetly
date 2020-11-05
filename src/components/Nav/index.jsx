import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Brand from './brand'
import './index.css';
import profile from '../../assets/face.svg';
import stats from '../../assets/stats.svg';
import calculate from '../../assets/calculate.svg';
import exit from '../../assets/exit.svg';

const Nav = () => {
    const [navOpen, setNav] = useState(false);
    function toggleNav() {
        setNav(() => !navOpen);
    }

    return (
    <nav className="mobile-only">
        <Brand />
        <ul className="navbar-list">
            {navOpen ?
            <li className="navbar-link-item">
                <Link to="/" className="navbar-link" onClick={toggleNav}>
                    log out   
                </Link>
            </li>
            :

            <li className="navbar-link-item">
                <Link to="/" className="navbar-link" onClick={toggleNav}>
                    Try Demo    
                </Link>
            </li>}
        </ul>
        <ul className={`navbar-list--alt ${navOpen ? "nav-open":"nav-close"}`}>
            <li>
                <Link to="/" className="nav-brand--alt">
                    <Brand />
                </Link>
            </li>
            <li>
                <Link to="/"className="nav-link--alt" >
                <img
                    src={profile} 
                    alt="profile"/>
                    profile
                </Link>
            </li>
            <li>
                <Link to="/"className="nav-link--alt" >
                <img
                    src={stats} 
                    alt="history"/>
                    history
                </Link>
            </li>
            <li>
                <Link to="/" className="nav-link--alt">
                <img
                    src={calculate} 
                    alt="calculator"/>
                    calculator
                </Link>
            </li>
            <li>
                <Link to="/" className="nav-link--alt" onClick={toggleNav}>
                <img
                    src={exit} 
                    alt="exit"/>
                    sign out
                </Link>
            </li>
        </ul> 
    </nav>
)}

export default Nav;

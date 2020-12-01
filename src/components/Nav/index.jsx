import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import Brand from './brand'
import './index.css';
import profile from '../../assets/face.svg';
import stats from '../../assets/stats.svg';
import calculate from '../../assets/calculate.svg';
import exit from '../../assets/exit.svg';
import {LoginContext} from '../../contexts/LoginContext'
import {logout} from '../../controls/online'

const Nav = ({tab, currentTab}) => {
    const {user} = useContext(LoginContext);

    const [navOpen, setNav] = useState(false);
    function toggleNav() {
        setNav(() => !navOpen);
    }

    const handleTabSelect = (e) => {
        tab(e.target.textContent);
        setNav(() => false);
    }

    return (
    <nav className="mobile-only">
        {!user ? 
            <Link to="/">
                <Brand/>
            </Link> : 
            <div onClick={handleTabSelect}>
                <Brand />
            </div>}
        {/* <Link to={user ? "/dashboard": "/"} onClick={handleTabSelect}>
            <Brand />
        </Link> */}
        <ul className="navbar-list">
            <li className="navbar-link-item navbar-toggler" onClick={toggleNav}>
                &equiv;   
            </li>
        </ul>
        <ul className={`navbar-list--alt ${navOpen ? "nav-open":"nav-close"}`}>
            <button className="nav-list-close" onClick={toggleNav}>&times;</button>
            <li>
                <Link to={user ? "/dashboard": "/"} className="nav-brand--alt">
                    <Brand />
                </Link>
            </li>
            <li onClick={handleTabSelect} value="profile" 
                className={currentTab === 1 ? "active nav-item" : "nav-item"}>
                <img
                    src={profile} 
                    alt="profile"/>
                    {user.displayName ? user.displayName : "profile"}
            </li>
            <li onClick={handleTabSelect} value="history" 
                className={currentTab === 3 ? "active nav-item" : "nav-item"}>
                <img
                    src={stats} 
                    alt="history"/>
                    history
            </li>
            <li onClick={handleTabSelect} value="calculator" 
                className={currentTab === 2 ? "active nav-item" : "nav-item"}>
                <img
                    src={calculate} 
                    alt="calculator"/>
                    calculator
            </li>
            <li>
                <button onClick = {logout} 
                    className={currentTab === 4 ? "active nav-item" : "nav-item"}>
                    <img
                        src={exit} 
                        alt="exit"/>
                        sign out
                </button>
            </li>
        </ul> 
    </nav>
)}

export default Nav;

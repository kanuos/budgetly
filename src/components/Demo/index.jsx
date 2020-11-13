import React, { useState } from 'react';
import FooterContent from '../Footer/content';
import Nav from '../Nav/demo';
import Brand from '../Nav/brand';
import { Link } from  'react-router-dom'
import './index.css';
import exit from '../../assets/exit.svg';
import add from '../../assets/new.svg';
import CrudTab from '../crudTab';

const Demo = () => {
    return (
        <div className="demo-wrapper">
        <Nav />
        <aside className="web-only aside-nav">
            <Brand />
            <ul className="aside-link-list">
                <li>
                <Link to={{
                    pathname : "/",
                    signIn : true
                }}>
                    <img
                        className="aside-link-icon" 
                        src={exit} 
                        alt="sign out"/>
                        sign In
                </Link>
                </li>
                <li>
                <Link to={{
                    pathname : "/",
                    signIn : false
                }}>
                    <img
                        className="aside-link-icon" 
                        src={add} 
                        alt="sign out"/>
                        register
                </Link>
                </li>
            </ul>
            <footer className="aside-footer">
                <FooterContent />
            </footer>
        </aside>
        <main>
            <div className="container">
                <CrudTab demoMode = {true} />
            </div>
        </main>
        </div>
    )
}

export default Demo

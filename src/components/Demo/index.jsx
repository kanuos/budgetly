import React from 'react';
import FooterContent from '../Footer/content';
import Nav from '../Nav';
import Brand from '../Nav/brand';
import Crud from '../crud';
import './index.css';
import exit from '../../assets/exit.svg';
import newUser from '../../assets/new.svg';

const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">
        <Nav />
        <aside className="web-only aside-nav">
            <Brand />
            <ul className="aside-link-list">              
                <li>
                    <a href="#">
                    <img
                        className="aside-link-icon" 
                        src={exit} 
                        alt="sign in"/>
                        sign in
                    </a>
                </li>
                <li>
                    <a href="#">
                    <img
                        className="aside-link-icon" 
                        src={newUser} 
                        alt="sign in"/>
                        register
                    </a>
                </li>
            </ul>
            <footer className="aside-footer">
                <FooterContent />
            </footer>
        </aside>
        <main>
            <div className="container">
                <Crud />
            </div>
        </main>
        </div>
    )
}

export default Dashboard

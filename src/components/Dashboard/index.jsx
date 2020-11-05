import React from 'react';
import FooterContent from '../Footer/content';
import Nav from '../Nav';
import Brand from '../Nav/brand';
import './index.css';
import profile from '../../assets/face.svg';
import exit from '../../assets/exit.svg';
import stats from '../../assets/stats.svg';
import calculate from '../../assets/calculate.svg';

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
                        src={profile} 
                        alt="profile"/>
                        profile
                    </a>
                </li>
                <li>
                    <a href="#">
                    <img
                        className="aside-link-icon" 
                        src={stats} 
                        alt="history"/>
                        history
                    </a>
                </li>
                <li>
                    <a href="#">
                    <img
                        className="aside-link-icon" 
                        src={calculate} 
                        alt="calculator"/>
                        calculator
                    </a>
                </li>
                <li>
                    <a href="#">
                    <img
                        className="aside-link-icon" 
                        src={exit} 
                        alt="sign out"/>
                        sign out
                    </a>
                </li>
            </ul>
            <footer className="aside-footer">
                <FooterContent />
            </footer>
        </aside>
        <main>
            <div className="container">
                lorem5000
            </div>
        </main>
        </div>
    )
}

export default Dashboard

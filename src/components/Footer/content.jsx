import React from 'react';
import github from '../../assets/g.svg';
import './index.css';

const FooterContent = () => {
    return (
        <div className="footer-content">
        <strong className="footer-text">
            Free, budget tracking app for you
        </strong>
        <span className="footer-text">
        created by Sounak {new Date().getFullYear()}
        </span>
        <ul className="footer-list">
            <li className="footer-list-item">
                <a 
                    rel="noreferrer"
                    target="_blank" 
                    href="https://github.com/kanuos?tab=repositories">
                    <img src={github} alt="Github"/>
                </a>
            </li>
        </ul>
        </div>
    )
}

export default FooterContent

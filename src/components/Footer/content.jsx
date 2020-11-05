import React from 'react';
import twitter from '../../assets/t.svg';
import facebook from '../../assets/f.svg';
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
                <a href="www.facebook.com">
                    <img src={facebook} alt="Facebook"/>
                </a>
            </li>
            <li className="footer-list-item">
                <a href="www.gihub.com">
                    <img src={github} alt="Github"/>
                </a>
            </li>
            <li className="footer-list-item">
                <a href="www.twitter.com">
                    <img src={twitter} alt="Twitter"/>
                </a>
            </li>
        </ul>
        </div>
    )
}

export default FooterContent

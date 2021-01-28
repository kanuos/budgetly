import React from 'react'
import { Link } from 'react-router-dom';
import Brand from '../Nav/brand';
import './index.css';

const ErrorPage = () => {
    return (
        <main className="error__main">
            <div className="container">
                <Brand />
                <h1>
                    <span>
                    Error 404
                    </span>
                    <span>
                        Page not found
                    </span>
                </h1>
                <Link to="/" className="link">Go to Home</Link>
            </div>
        </main>
    )
}

export default ErrorPage

import React from 'react';
import Brand from '../Nav/brand';
import './index.css'

const Loader = () => {
    return (
        <section className="loader-box">
            <Brand/>
            <h2>
                Loading
            </h2>
            <div className="loader-line-container">
                <span className="loader-line"></span>
            </div>
        </section>
    )
}

export default Loader

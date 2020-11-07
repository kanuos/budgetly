import React from 'react';
import {getCurrentMonth, getCurrentYear} from '../../utils';
import './index.css';

const index = () => {
    return (
        <section className="crud-box">
            <header className="crud-header">
                <h1 className="crud-title">
                    Budget for the month of {getCurrentMonth()} {getCurrentYear()}
                </h1>
            </header> 
            <div className="crud-list-box">
                <ul className="crud-income"></ul>
                <ul className="crud-expense"></ul>
            </div>
        </section>
    )
}

export default index

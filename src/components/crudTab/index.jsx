import React from 'react';
import {getCurrentMonth, getCurrentYear} from '../../utils';
import './index.css';

const index = () => {
    
    return (
        <section className="crud-box">
            <header className="crud-header">
                <h1 className="crud-title">
                    Budget {getCurrentMonth()} {getCurrentYear()}
                </h1>
                <ul className="budget-list">
                    <li className="budget-li final-li">
                        <span className="budget-li-key">final report</span>
                        <span className="budget-li-value">750</span>
                    </li>
                    <li className="budget-li income-li">
                        <span className="budget-li-key">total income</span>
                        <span className="budget-li-value">1200</span>
                    </li>
                    <li className="budget-li expense-li">
                        <span className="budget-li-key">total expense</span>
                        <span className="budget-li-value">450</span>
                    </li>
                </ul>
                <button className="add-task-btn mobile-only">
                    +
                </button>
            </header> 
            <button className="add-task-btn web-only">
                +
            </button>
            <div className="crud-data-box">
                <article className="crud-article crud-income">
                    <legend className="legend-income">
                        income
                    </legend>
                </article>
                <article className="crud-article rud-expense">
                    <legend className="legend-expense">
                        expense
                    </legend>
                </article>
            </div>
        </section>
    )
}

export default index

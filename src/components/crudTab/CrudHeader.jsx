import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

const CrudHeader = (props) => {
    const {demoMode = false,month, year, income = 0, expense = 0,total=0, callbackFn, showBtn = true} = props;
    return (
        <header className="crud-header">
            {!demoMode && <h1 className="crud-title">
                Budget {month} {year}
            </h1>}
            {demoMode && <h1 className="crud-title">
                DEMO MODE
            </h1>}
            {demoMode && 
                <span>
                    Data wont be preserved! 
                    <Link to="/">Register for FREE</Link> to use FULL APP
                </span>
            }
            <ul className="budget-list">
                <li className="budget-li final-li">
                    <span className="budget-li-key">final report</span>
                    <span className="budget-li-value">
                        {total.toFixed(2)}
                    </span>
                </li>
                <li className="budget-li income-li">
                    <span className="budget-li-key">total income</span>
                    <span className="budget-li-value">
                        {income.toFixed(2)}
                    </span>
                </li>
                <li className="budget-li expense-li">
                    <span className="budget-li-key">total expense</span>
                    <span className="budget-li-value">
                        {expense.toFixed(2)}
                    </span>
                </li>
            </ul>
            {showBtn && <button
                onClick = {callbackFn} 
                className="add-task-btn">
                +
            </button>}
        </header>
    )
}

export default CrudHeader

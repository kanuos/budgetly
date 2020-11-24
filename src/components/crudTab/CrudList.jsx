import React from 'react';
import Transaction from '../Transaction';
import './index.css';

const CrudList = ({incomes, expenses, operation}) => {
    return (
        <div className="crud-data-box">
        <article className="crud-article crud-income">
            <legend className="legend-income">
                income
            </legend>
            {incomes.map(item => {
                const {amount, desc, id, type, date} = item;
                return (
                <Transaction 
                    key={id} 
                    id={id} 
                    date = {date}
                    type = {type}
                    edit = {operation}
                    remove = {operation}
                    amount={amount} 
                    desc = {desc}/>
                )
            })}
        </article>
        <article className="crud-article rud-expense">
            <legend className="legend-expense">
                expense
            </legend>
            {expenses.map(item => {
                const {amount, date, desc, id, type} = item;
                return (
                <Transaction 
                    key={id} 
                    id={id} 
                    date = {date}
                    type = {type}
                    edit = {operation}
                    remove = {operation}
                    amount={amount} 
                    desc = {desc}/>
                )
            })}
        </article>
    </div>
    )
}

export default CrudList

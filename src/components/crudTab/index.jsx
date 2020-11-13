import React, { useState, useEffect } from 'react';
import {getCurrentMonth, getCurrentYear} from '../../utils';
import './index.css';
import TaskModal from '../TaskModal'
import {v4 as uuid} from 'uuid'
import Transaction from '../Transaction'
// import {addEntry, deleteEntry, editEntry} from '../../controls/offline'


const CrudTab = (props) => {
    const {initialIncomes, initialExpenses, demoMode=false} = props;
    
    const [incomes, setIncomes] = useState(initialIncomes || [])
    const [expenses, setExpenses] = useState(initialExpenses || []);
    const [total, setTotal] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    
    const [modalOn, setModal] = useState(false);
    
    function getFormData(data){
        data.id = uuid();
        if (data.type.toLowerCase() === "exp"){
            setExpenses(() => [...expenses, data])
        }
        else{
            setIncomes(() => [...incomes, data])
        }
    }

    useEffect(() => {
        setTotal(income - expense)
    }, [income, expense])

    useEffect(() => {
        setIncome(incomes.reduce((acc,cur) => {
            return acc + parseFloat(cur.amount)
        }, 0))
    }, [incomes])
    
    useEffect(() => {
        setExpense(expenses.reduce((acc,cur) => {
            return acc + parseFloat(cur.amount)
        }, 0))
    }, [expenses])


    return (
        <>
        <section className="crud-box">
            <header className="crud-header">
                <h1 className="crud-title">
                    Budget {getCurrentMonth()} {getCurrentYear()}
                </h1>
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
                <button
                    onClick = {() => setModal(!modalOn)} 
                    className="add-task-btn mobile-only">
                    +
                </button>
            </header> 
            <button
                onClick = {() => setModal(!modalOn)} 
                className="add-task-btn web-only">
                +
            </button>
            <div className="crud-data-box">
                <article className="crud-article crud-income">
                    <legend className="legend-income">
                        income
                    </legend>
                    {incomes.map(item => {
                        const {amount, desc, id} = item;
                        return (
                        <Transaction 
                            key={id} 
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
                        const {amount, desc, id} = item;
                        return (
                        <Transaction 
                            key={id} 
                            amount={amount} 
                            desc = {desc}/>
                        )
                    })}
                </article>
            </div>
        </section>
        <TaskModal 
            demoMode = {demoMode}
            show={modalOn} 
            getData = {getFormData}
            initialData = {null}
            toggle = {() => setModal(!modalOn)}/>
        </>
    )
}

export default CrudTab

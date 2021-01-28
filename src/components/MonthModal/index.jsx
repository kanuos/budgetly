import React, { useEffect, useState } from 'react';
import Analytics from '../analytics';
import CrudHeader from '../crudTab/CrudHeader'
import CrudList from '../crudTab/CrudList'
import './index.css'

const MonthModal = ({data, close, show, edit, remove}) => {
    const [transactions, setTransactions] = useState(data.tnx || []);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([])

    useEffect(()=> {
        setIncomes(() => transactions.filter(el => el.type === 'inc'));
        setExpenses(() => transactions.filter(el => el.type === 'exp'));
    }, [transactions]);

    useEffect(()=> {
        if (transactions.length === 0){
            setTransactions(() => []);
        }
    }, [transactions])

    return (
    <section className={`month-modal ${show ? "show" : "hide"}`}>
        <div className="modal-container">
                <button
                    onClick={close} 
                    className="close-modal">&times;
                </button>
                {transactions.length > 0 && 
                <>
                <section className="crud-box">
                    <CrudHeader 
                        month = {data.month}
                        year = {data.year}
                        income = {incomes.reduce((acc,cur) => acc + Number(cur.amount), 0)}
                        expense = {expenses.reduce((acc,cur) => acc + Number(cur.amount), 0)}
                        total = {incomes.reduce((acc,cur) => acc + Number(cur.amount), 0) - expenses.reduce((acc,cur) => acc + Number(cur.amount), 0)}
                        showBtn = {false}
                        />
                    <section className="crud-section">
                        <div className="analytics-box container">
                            <Analytics data = {incomes} type="inc"/>
                            <Analytics data = {expenses} type="exp"/>
                        </div>
                        <CrudList 
                            incomes = {incomes} 
                            expenses = {expenses}
                            remove = {remove} 
                            edit = {edit}/>
                    </section>
                </section>
                </>}
            </div>
        </section>
    )
}

export default MonthModal

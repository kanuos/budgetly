import React, { useState, useEffect } from 'react';
import {getCurrentMonth, getCurrentYear} from '../../utils';
import TaskModal from '../TaskModal'
import {v4 as uuid} from 'uuid'
import Transaction from '../Transaction';
import {Link} from 'react-router-dom'
import {addEntry, deleteEntry, editEntry} from '../../controls/offline'
import {addTransaction , getCurrentMonthTnxByUser, deleteTnx} from '../../controls/online'
import './index.css';


const CrudTab = (props) => {
    const {initialIncomes, initialExpenses, demoMode=false} = props;
    const [existingData, setExistingData] = useState(null);
    const [incomes, setIncomes] = useState(initialIncomes || [])
    const [expenses, setExpenses] = useState(initialExpenses || []);
    const [total, setTotal] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [entries, setEntries] = useState([]);
    const [modalOn, setModal] = useState(false);
    
    function getFormData(data, edit){
        if (!edit){
            data.id = uuid();
        }
        if (demoMode){
            setEntries(() => addEntry(data, edit));
            setExistingData(null);
            setEditMode(false);
        }
        else {
             addTransaction(data);
             retrieveData()
            }
    }

    function retrieveData() {
        getCurrentMonthTnxByUser()
            .then(data => setEntries(() => [...data]))
    }

    function operation(id, operation){
        switch(operation){
            case "remove" :
                const confirmation = window.confirm("Item once deleted will be lost forever. Are you sure you want to delete ?");
                if (!confirmation){
                    return;
                }
                if (demoMode){
                    setEntries(() => deleteEntry(id))
                }
                else {
                    deleteTnx(id)
                    .then(retrieveData)
                    .catch(console.log)
                }
                break;
            default : 
                if(demoMode){
                    const data = editEntry(id)
                    setExistingData(() => ({...data}));

                }
                else {
                    // for firestore
                }
                setEditMode(true);
                setModal(!modalOn);
                break;
        }
    }

    useEffect(()=> {
        retrieveData()
    }, [])

    useEffect(()=> {
        setIncomes(() => entries.filter(entry => entry.type === "inc"))
        setExpenses(() => entries.filter(entry => entry.type === "exp"))
    }, [entries])

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
                {!demoMode && <h1 className="crud-title">
                    Budget {getCurrentMonth()} {getCurrentYear()}
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
        </section>
        <TaskModal 
            key={editMode}
            demoMode = {demoMode}
            show={modalOn} 
            getData = {getFormData}
            initialData = {existingData}
            toggle = {() => setModal(!modalOn)}/>
        </>
    )
}

export default CrudTab

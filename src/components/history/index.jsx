import React, { useEffect, useState } from 'react'
import {getAllTnxByUser} from '../../controls/online';
import {arrayGroupByYearAndMonth} from '../../utils'
import ListView from '../ListView';
import MonthCard from '../MonthView';
import Loader from '../Loader'
import './index.css'
import calendar from '../../assets/month.svg'
import list from '../../assets/list.svg'

const History = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState(props.data || []);
    const [totalIncome, setTotalIncome] = useState(0); 
    const [totalExpense, setTotalExpense] = useState(0);
    const [averageIncome, setAverageIncome] = useState(0); 
    const [averageExpense, setAverageExpense] = useState(0);
    const [lowestIncome, setLowestIncome] = useState(0); 
    const [lowestExpense, setLowestExpense] = useState(0);
    const [highestIncome, setHighestIncome] = useState(0); 
    const [highestExpense, setHighestExpense] = useState(0);
    const [oldestIncome, setOldestIncome] = useState(0); 
    const [oldestExpense, setOldestExpense] = useState(0);
    const [latestIncome, setLatestIncome] = useState(0); 
    const [latestExpense, setLatestExpense] = useState(0);
    const [tableData, setTable] = useState({});

    const [currentView, setCurrentView] = useState(1);
    
    const [monthly, setMonthly] = useState(null);

    useEffect(()=> {
        getAllTnxByUser()
        .then(tns => {
            setTransactions(() => [...tns])
            setLoading(false)
        })
        .catch(err => null)

    }, [])

    useEffect(()=> {
        if (transactions.length){
            const incomes = transactions.filter(el => el.type==="inc")
            const expenses = transactions.filter(el => el.type==="exp")
            
            setMonthly(() => arrayGroupByYearAndMonth(transactions));
        
            const exps = expenses.reduce((acc, cur) => acc + Number(cur.amount),0)
            const incs = incomes.reduce((acc, cur) => acc + Number(cur.amount),0)
            setTotalExpense(() => exps)
            setTotalIncome(() => incs)
            try {
                setAverageExpense(exps/expenses.length)
                setAverageIncome(incs/incomes.length)
                setOldestExpense(expenses[0])
                setOldestIncome(incomes[0])
                setLatestExpense(expenses[expenses.length - 1])
                setLatestIncome(incomes[incomes.length - 1])
                setLowestExpense([...expenses].sort((a,b) => Number(a.amount) - Number(b.amount))[0])
                setLowestIncome([...incomes].sort((a,b) => Number(a.amount) - Number(b.amount))[0])
                setHighestExpense([...expenses].sort((b,a) => Number(a.amount) - Number(b.amount))[0])
                setHighestIncome([...incomes].sort((b,a) => Number(a.amount) - Number(b.amount))[0])
                setTable(() => ({
                    averageIncome, 
                    averageExpense, 
                    lowestIncome,  
                    lowestExpense,                     
                    highestIncome, 
                    highestExpense, 
                    oldestIncome,                     oldestExpense,                     latestIncome,                     
                    latestExpense
                }))
            }
            catch(err) { }
        }
    }, [transactions, averageExpense, averageIncome, latestExpense, latestIncome, lowestExpense, lowestIncome, oldestExpense, oldestIncome, highestExpense, highestIncome])

return isLoading ? <Loader /> : (
    <>
    <header className="profile-header">
        <h1>
            hi {props.user}, 
            <br/>
        </h1>
        <small>
            {new Date().toDateString()}
        </small>
        <section className="profile-dossier">
            <div className="container">
                <h1>
                    Here's your financial dossier
                </h1>
            </div>
            <div className="container">
                <h2>
                    <span>
                        Cumulative income
                    </span>
                    <span>
                        $ {totalIncome.toFixed(2)}
                    </span>
                </h2>
                <h2>
                    <span>
                        Cumulative expense
                    </span>
                    <span>
                        $ {totalExpense.toFixed(2)}
                    </span>
                </h2>
            </div>
            <div className="container">
                <h1>
                    Detail report 
                </h1>
            </div>
        </section>
    </header>
    <article className="profile-body">
        <h2>
            Transactions
        </h2>
        <ul className="tab-view">
            <li onClick={() => setCurrentView(1)} title="transaction view">
                <img
                    className = {currentView === 1 ? "active" : ""} 
                    src={list} 
                    alt="transactions list"/>
            </li>
            <li onClick={() => setCurrentView(2)} title="month view">
                <img 
                    className = {currentView === 2 ? "active" : ""} 
                    src={calendar} 
                    alt="montly transactions"/>
            </li>
        </ul>
        
        {currentView === 1 ? 
            <section className="transaction-container">
            {Object.keys(monthly).map(year => {
            return <ListView 
                    key = {year} 
                    year = {year} 
                    transactions = {monthly[year]} />
                })}
        </section>
           : <section className="month-card-container">
            {Object.keys(monthly).map(year => {
            return <MonthCard 
                    key = {year}  
                    year = {year}
                    transactions = {monthly[year]} />
                })}
        </section>
        }
    </article>
    </>

)}

export default History

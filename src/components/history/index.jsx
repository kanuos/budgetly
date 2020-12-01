import React, { useEffect, useState } from 'react'
import {getAllTnxByUser} from '../../controls/online';
import {arrayGroupByYearAndMonth} from '../../utils'
import ListView from '../ListView';
import TableView from '../TableView';
import MonthCard from '../MonthView';
import Loader from '../Loader'
import './index.css'
import calendar from '../../assets/month.svg'
import list from '../../assets/list.svg'
import {PieChart, Pie } from 'recharts'
import MonthModal from '../MonthModal';
import TaskModal from '../TaskModal'

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


    const [currentView, setCurrentView] = useState(2);
    const [showMore, setShowMore] = useState(false);
    const [monthly, setMonthly] = useState(null);
    const [openModal, toggleModal] = useState(false);
    const [modalData, setModalData] = useState(null)

    const [crudModal, toggleCrudModal] = useState(false);


    useEffect(()=> {
        getAllTnxByUser()
        .then(tns => {
            tns = tns.map(el => ({...el, amount : Number(el.amount)}))
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
                    average : {averageIncome, averageExpense}, 
                    lowest : {lowestIncome, lowestExpense},                     
                    highest : {highestIncome, highestExpense}, 
                    oldest : {oldestIncome,oldestExpense},                     latest : {latestIncome,latestExpense}
                }))
            }
            catch(err) { }
        }
    }, [transactions, averageExpense, averageIncome, latestExpense, latestIncome, lowestExpense, lowestIncome, oldestExpense, oldestIncome, highestExpense, highestIncome])

    function openModalWithData(data){
        toggleModal(() => !openModal);
        setModalData(() => data)
    }

    function closeModal(){
        toggleModal(false);
        setModalData(null);
    }

    function getCrudData (data) {
        console.log(`History Component > Add item rcvd `, data);
        // detect whether data has an id property to distinguish an EDIT and ADD tnx
    }

    function deleteItem(id){
        console.log(`History Component > Delete item with id ${id}`);
    }

    function editItem(id){
        console.log(`History Component > Edit item with id ${id}`);
    }


return isLoading ? <Loader /> : (
    <>
    {modalData && <MonthModal
        edit = {editItem}
        remove = {deleteItem} 
        show = {openModal} 
        data = {modalData} 
        close = {closeModal}/>}
    
    <TaskModal 
        historyMode = {true}
        show = {crudModal}
        minDate = "2000-01-01"
        getData = {getCrudData}
        toggle = {() => toggleCrudModal(!crudModal)}
        />
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
            <ul className="graph-legend">
                    <li>
                        <span className="graph-color inc"></span>
                        <strong>Income</strong>
                    </li>
                    <li>
                        <span className="graph-color exp"></span>
                        <strong>Expense</strong>
                    </li>
                </ul>
            {transactions.length > 0 && <div className="graph-box">
                <PieChart width={300} height={300}>
                    <Pie 
                        data={transactions.filter(el => el.type === 'inc')}
                        nameKey = "type" 
                        dataKey="amount" cx={150} cy={150} innerRadius={50} outerRadius={90} fill={`var(--income)`} />
                    <Pie 
                        data={transactions.filter(el => el.type === 'exp')}
                        nameKey = "type" 
                        dataKey="amount" cx={150} cy={150} outerRadius={50} fill={`var(--expense)`} label/>
                </PieChart>
                <PieChart width={300} height={300}>
                    <Pie 
                        data={transactions.filter(el => el.type === 'inc')}
                        nameKey = "type" 
                        dataKey="amount" cx={150} cy={150} outerRadius={90} fill={`var(--income)`}
                         />

                </PieChart>
                <PieChart width={300} height={300}>
                    <Pie 
                        data={transactions.filter(el => el.type === 'exp')}
                        nameKey = "type" 
                        dataKey="amount" cx={150} cy={150} outerRadius={90} fill={`var(--expense)`} />

                </PieChart>
            </div>}
            <span className="show-btn" onClick = {() => setShowMore(!showMore)}>
                show {showMore ? "less" : "more"}
            </span>
            <div className={`container table-data show-${showMore ? "more" : "less"}`}>
                <TableView data = {tableData}/>
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
        <div className="button-box">
            <button className="add-btn" onClick={() => toggleCrudModal(!crudModal)}>
                add transaction +
            </button> 
        </div>
        {currentView === 1 ? 
            <section className="transaction-container">
            {Object.keys(monthly).map(year => {
            return <ListView 
                    key = {year} 
                    year = {year}
                    edit = {editItem}
                    remove = {deleteItem} 
                    transactions = {monthly[year]} />
                })}
        </section>
           : <section className="month-card-container">
            {Object.keys(monthly).map(year => {
                return <MonthCard 
                    getData = {data => openModalWithData(data)}
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

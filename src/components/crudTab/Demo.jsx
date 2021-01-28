import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import TaskModal from '../TaskModal'
import CrudHeader from './CrudHeader'
import CrudList from './CrudList'
import { getCurrentMonth, getCurrentYear } from '../../utils';
import {LoginContext} from '../../contexts/LoginContext'

const DemoTab = () => {

    const {user} = useContext(LoginContext)
    const history = useHistory();

    const [existingData, setExistingData] = useState(null);
    const [entries, setEntries] = useState([]);
    const [modalOn, setModal] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [incEntries, setIncomes] = useState([]);
    const [expEntries, setExpenses] = useState([]);

    function toggleCRUDModal() {
        setModal(!modalOn)
    }
    useEffect(()=> {
        if (user){
            history.push("/dashboard");
        }else {
            const storedData = JSON.parse(sessionStorage.getItem('budget-demo'));
            if (storedData){
                setEntries(() => storedData)
            }
        }
    }, [history, user])

    useEffect(()=> {
        sessionStorage.setItem('budget-demo', JSON.stringify(entries))
        setIncomes(() => entries.filter(el => el.type === 'inc'))
        setExpenses(() => entries.filter(el => el.type === 'exp'))
        
        let totalInc = 0, totalExp = 0;
        entries.forEach(el => {
            if(el.type === 'inc'){
                totalInc += Number(el.amount)
            }
            else
                totalExp += Number(el.amount)
        })
        setTotalIncome(() => totalInc)
        setTotalExpense(() => totalExp)
    
    }, [entries])

    const offlineEdit = (id) => {
        toggleCRUDModal();
        const data = entries.find(el => el.id === id)
        offlineDelete(id)
        setExistingData(() => ({...data}))
    }    
    const offlineDelete = (id) => {
         setEntries(() => [...entries.filter(el => el.id !== id)])
    }    

    const offlineAdd = (entry) => {
        if (!existingData){
            entry.id = Date.now()
        }
        entry.amount = Number(entry.amount)
        setEntries(() => [...entries, entry])
        setExistingData(null);
    }

    return (
        <>
        <section className="crud-box">
            <CrudHeader 
                key= {entries}
                month = {getCurrentMonth()}
                year = {getCurrentYear()}
                income = {totalIncome}
                expense = {totalExpense}
                total = {totalIncome - totalExpense}
                callbackFn = {toggleCRUDModal}
                />
            <CrudList 
                incomes = {incEntries} 
                expenses = {expEntries} 
                edit = {offlineEdit}
                remove = {offlineDelete}/>
        </section>
        <TaskModal 
            demoMode = {true}
            show={modalOn} 
            getData = {offlineAdd}
            initialData = {existingData}
            toggle = {() => setModal(!modalOn)}/>
        </>
    )
}

export default DemoTab

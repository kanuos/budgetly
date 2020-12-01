import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import TaskModal from '../TaskModal'
import CrudHeader from './CrudHeader'
import CrudList from './CrudList'
import {addEntry, deleteEntry, editEntry} from '../../controls/offline'
import { getCurrentMonth, getCurrentYear } from '../../utils';
import {LoginContext} from '../../contexts/LoginContext'

const DemoTab = () => {

    const {user} = useContext(LoginContext)
    const history = useHistory();

    const [existingData, setExistingData] = useState(null);
    const [editMode, setEditMode] = useState(false);
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
        }
    }, [])

    const offlineEdit = (id) => {
        console.log('Edit data with id ', id);
    }    
    const offlineDelete = (id) => {
        console.log('Delete data with id ', id);
    }    

    const offlineAdd = (entry) => {
        entry.stamp = Date.now()
        setEntries(() => [...entries, entry])
    }

    return (
        <>
        <section className="crud-box">
            <CrudHeader 
                month = {getCurrentMonth()}
                year = {getCurrentYear()}
                income = {totalIncome}
                expense = {totalExpense}
                total = {Number(totalIncome) - Number(totalExpense)}
                callbackFn = {toggleCRUDModal}
                />
            <CrudList 
                incomes = {incEntries} 
                expenses = {expEntries} 
                edit = {offlineEdit}
                remove = {offlineDelete}/>
        </section>
        <TaskModal 
            key={editMode}
            demoMode = {true}
            show={modalOn} 
            getData = {offlineAdd}
            initialData = {existingData}
            toggle = {() => setModal(!modalOn)}/>
        </>
    )
}

export default DemoTab

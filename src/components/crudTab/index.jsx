import React, { useState, useEffect } from 'react';
import TaskModal from '../TaskModal'
import {v4 as uuid} from 'uuid'
import Loader from '../Loader'
import CrudHeader from './CrudHeader'
import CrudList from './CrudList'
import {addTransaction , getCurrentMonthTnxByUser, deleteTnx, getItemToEdit} from '../../controls/online'
import './index.css';
import { getCurrentMonth, getCurrentYear } from '../../utils';


const CrudTab = (props) => {
    const {initialIncomes, initialExpenses, demoMode=false} = props;
    const [isLoading, setLoading] = useState(true);
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
        addTransaction(data)
        .then(retrieveData)
        .catch(console.log)
    }

    function retrieveData() {
        getCurrentMonthTnxByUser()
            .then(data => {
                setEntries(() => [...data])
                setLoading(false);
            })
    }

    function edit(id){
        getItemToEdit(id)
        .then(data => {
            setExistingData(() => ({...data, id}))
            setEditMode(true);
            setModal(!modalOn)
        })
        .catch(console.log)

    }

    function remove(id){
        const confirmation = window.confirm("Item once deleted will be lost forever. Are you sure you want to delete ?");
        if (!confirmation){
            return;
        }
        else {
            deleteTnx(id)
            .then(retrieveData)
            .catch(console.log)
        }
    }

    function toggleCRUDModal() {
        setModal(!modalOn)
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


    return isLoading ? <Loader /> : (
        <>
        <section className="crud-box">
            <CrudHeader 
                month = {getCurrentMonth()}
                year = {getCurrentYear()}
                income = {income}
                expense = {expense}
                total = {total}
                callbackFn = {toggleCRUDModal}
                />
            <CrudList 
                incomes = {incomes} 
                expenses = {expenses} 
                edit = {edit}
                remove = {remove}
            />
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

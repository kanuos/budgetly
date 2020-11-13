import React, { useEffect, useState } from 'react';
import Brand from '../Nav/brand'
import './index.css';
import {today, firstDayOfMonth, validMinimumLength, getCustomTimeObject} from '../../utils'

const TaskUI = (props) => {
    const {show=false,initialData, toggle, getData, demoMode=false} = props;
    
    const [editMode, setEditMode] = useState(false);
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(today.toString());
    const [desc, setDesc] = useState("");
    
    const [typeErr, setTypeErr] = useState("");
    const [amountErr, setAmountErr] = useState("");
    const [dateErr, setDateErr] = useState("");
    const [descErr, setDescErr] = useState("");

    useEffect(()=> {
        if(initialData){
            console.log(initialData);
            setType(() => initialData.type);
            setAmount(() => initialData.amount);
            setDate(() => initialData.date);
            setDesc(() => initialData.desc);
            setEditMode(true);
        }
        else {
            setType("");
            setAmount("");
            setDate(today.toString());
            setDesc("");
        }
    }, [initialData])

    function handleToggle() {
        setType("");
        setAmount("");
        setDate("");
        setDesc("");
        setEditMode(false);
        toggle();
    }

    function handleSubmit (e) {
        try {
            e.preventDefault();
            if (!["inc", "exp"].includes(type)){
                setTypeErr("Transaction type not selected")
                return
            }
            else if(!validMinimumLength(amount,1) && typeof(amount) !== Number){
                setAmountErr("Transaction amount must be greater than 0")
                return
            }
            else if (!validMinimumLength(desc,1)){
                setDescErr("Description cannot be empty")
                return
            }
            else {
                const dateObj = getCustomTimeObject(date);
                
                if(dateObj){
                    const data = {
                        ...dateObj, type, amount, desc
                    }
                    if(initialData && initialData.id) {
                        data.id = initialData.id;
                    }
                    setType("")
                    setAmount("")
                    setDesc("")
                    setDate(today.toString())
                    getData({...data},editMode)
                    toggle()
                }
            }
        }
        catch(err) {
            
        }    
    }

    useEffect(()=> {
        const clearErr = setTimeout(() => {
            setDescErr("");
        }, 2000);
        return () => clearTimeout(clearErr)
    }, [descErr])

    useEffect(()=> {
        const clearErr = setTimeout(() => {
            setTypeErr("");
        }, 2000);
        return () => clearTimeout(clearErr)
    }, [typeErr])

    useEffect(()=> {
        const clearErr = setTimeout(() => {
            setAmountErr("");
        }, 2000);
        return () => clearTimeout(clearErr)
    }, [amountErr])

    useEffect(()=> {
        const clearErr = setTimeout(() => {
            setDateErr("");
        }, 2000);
        return () => clearTimeout(clearErr)
    }, [dateErr])


    return (
        <div className="ui-container">
        <section className={`ui ui-${show?"show":"hide"}`}>
            <button 
                className="close-ui"
                onClick={handleToggle}>
                    &times;
            </button>
            <form onSubmit={handleSubmit}>
                <Brand />
                <h2>
                    add/edit task
                </h2>
                <section className="form-group">
                    <div className="input-group">
                        <label htmlFor="">
                            type of transaction
                        </label>
                        <div className="input-group--flex">
                            <div className="input-group--flex">
                                <input 
                                    type="radio" 
                                    id="inc"
                                    key = {type==="inc"}
                                    defaultChecked = {type==="inc"}
                                    value="inc"
                                    onChange={() => setType("inc")}
                                    name="type"/>
                                <label htmlFor="inc">Income</label>
                            </div>
                            <div className="input-group--flex">
                                <input 
                                    type="radio" 
                                    id="exp"
                                    key = {type==="exp"}
                                    defaultChecked = {type==="exp"}
                                    value="exp"
                                    onChange={() => setType("exp")}
                                    name="type"/>
                                <label htmlFor="exp">Expense</label>
                            </div>
                        </div>
                        {typeErr.length > 0 && 
                        <span className="form-error">
                            {typeErr}
                        </span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="amount">
                            transaction amount
                        </label>
                        <input 
                            id="amount" 
                            type="number" 
                            min="1"
                            value = {amount}
                            onChange = {e => setAmount(e.target.value)}
                            step=".5"
                            className={amountErr.length > 0 ? "error-true" : ""}/>
                        { amountErr.length > 0 &&
                        <span className="form-error">
                            {amountErr}
                        </span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="desc">
                            transaction description
                        </label>
                        <textarea 
                            value = {desc}
                            onChange = {e => setDesc(e.target.value)}
                            className={descErr.length > 0 ? "error-true" : ""}
                            id="desc"></textarea>
                        {descErr && 
                        <span className="form-error">
                            {descErr}
                        </span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="date">
                            date of transaction
                        </label>
                    {!demoMode && <input 
                            id="date"
                            className={dateErr.length > 0 ? "error-true" : ""}
                            type="date" 
                            value = {date}
                            max={today.toString()}
                            onChange = {e => setDate(e.target.value)}
                            placeholder="Descrpion"/>}
                    {demoMode && <input 
                            id="date"
                            className={dateErr.length > 0 ? "error-true" : ""}
                            type="date" 
                            value = {date}
                            min={firstDayOfMonth.toString()}
                            max={today.toString()}
                            onChange = {e => setDate(e.target.value)}
                            placeholder="Descrpion"/>}
                        {dateErr.length > 0 && 
                        <span className="form-error">
                            {dateErr}
                        </span>}
                    </div>
                    
                    <div className="input-group">
                        <button className="add-btn btn">Submit</button>
                    </div>
                </section>
            </form>
        </section>
    </div>
    )
}

export default TaskUI

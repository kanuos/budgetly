import React, { useEffect, useState } from 'react';
import Brand from '../Nav/brand'
import {validMinimumLength, createObjectFromArray, isValidEmail} from '../../utils'
import './index.css';

const Form = (props) => {
    const {fields, title} = props.children;
    const [formValue, setFormValue] = useState({...createObjectFromArray(fields)});
    
    const [formError, setError] = useState("");

    const getValues = value => {
        const dataCopy = {...formValue};
        dataCopy[Object.keys(value)[0]] = Object.values(value)[0]
        setFormValue(() => ({...dataCopy}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (Object.values(formValue).some(el => el.trim().length === 0)){
            if (fields.includes("name") && !validMinimumLength(formValue.name, 2)){
                setError("name field must be at least 2 characters long");
                setFormValue(() => ({...formValue, name : ""}));
                return
            }
            if (!isValidEmail(formValue.email)){
                setError("invalid email");
                setFormValue(() => ({...formValue, email : ""}));
                return
            }
            if (!validMinimumLength(formValue.password, 6)){
                console.log("PWD : ", formValue)
                setError("password must be non empty and at least 6 characters long");
                setFormValue(() => ({...formValue, password : ""}));
                return
            }
        }
        else {
            console.log("Submitted data : ",formValue, createObjectFromArray(fields));
            setFormValue(() => ({...formValue, ...createObjectFromArray(fields)}));
        }
    }

    useEffect(()=> {
        const popupMsg = setTimeout(()=> {
            setError("");
        }, 1500);
        return () => clearTimeout(popupMsg);
    }, [formError])

    return (
        <form onSubmit={handleSubmit}>
            <header className="form-header">
                <Brand />
                <h2 className="form-title">{title}</h2>
                <strong className="form-error">
                    {formError}
                </strong>
            </header>
            {fields.map((field, i) => {
                return (
                <FormField
                    handleChange = {getValues}
                    key={i} 
                    field={field}/>
            )
            })}
            <div className="form-btn-box">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Form


const FormField = ({field, handleChange}) => {
    const [value, setValue] = useState("");
    const [active, setActive] = useState(false);

    useEffect(()=> {
        setActive(() => value.trim().length > 0)
        handleChange({[field] : value})
    }, [value, field])

    return (
    <section className="form-group">
        <input 
            value= {value}
            onChange = {e => setValue(() => e.target.value)}
            autoComplete="off"
            className="form-input"
            type={field} 
            id={field}/>
        <label
            className={active ? "form-label active-label" : "form-label"}
            htmlFor={field}>
            your {field}
        </label>
    </section>
)
}
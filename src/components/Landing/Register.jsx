import React, { useState, useEffect } from 'react';
import Brand from '../Nav/brand';
import {validField} from '../../utils';
import MiniLoader from '../Loader/miniLoader';
import {register} from '../../controls/online'
import './index.css'
import { Link } from 'react-router-dom';

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [formError, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(()=> {
        const popupMsg = setTimeout(()=> {
            setError(false);
            setMsg("");
        }, 1500);
        return () => clearTimeout(popupMsg);
    }, [msg])


    async function handleSubmit(e) {
        e.preventDefault();
        let valid = null
        valid = validField("name", name, 2);
        if (!valid.isValid){
            setError(true)
            setMsg(() => valid.error)
            return
        }
        valid = validField("email", email);
        if (!valid.isValid){
            setError(true)
            setMsg(() => valid.error)
            return
        }
        valid = validField("password", password, 6);
        if (!valid.isValid){
            setError(true)
            setMsg(() => valid.error)
            setPassword("")
            return
        }
        setLoading(() => true);        
        register(email, password, name)
        .then(() => {
            setMsg("user created successfully! Login to continue")
            clearFields();
            setTimeout(function(){
                setMsg("")
                setError(false);
                props.onSuccess.push("/")
            }, 2500)
        })
        .catch(err =>{
            setError(true);
            setMsg(err.message);
        })
        .finally(() =>setLoading(false))    
    }

    function clearFields(){
        setEmail("");
        setName("");
        setPassword("");
    }

    return (
        <>
        <form onSubmit = {handleSubmit} className="account-form">
            <header className="form-header">
                <Brand />
                <h2 className="form-title">
                    register
                </h2>
                {msg.length > 0 && <strong className={formError ? "form-error" : "form-success"}>
                    {msg}
                </strong>}
                {isLoading && <div className="form-loader-box">
                    <MiniLoader />
                </div>}
            </header>
            <section className="form-group">
                <input 
                    value= {name}
                    onChange = {e => setName(() => e.target.value)}
                    autoComplete="off"
                    className="form-input"
                    type="name" 
                    id="name"/>
                <label
                    className={name.trim().length > 0 ? "form-label active-label" : "form-label"}
                    htmlFor="name">
                    your name
                </label>
            </section>
            <section className="form-group">
                <input 
                    value= {email}
                    onChange = {e => setEmail(() => e.target.value)}
                    autoComplete="off"
                    className="form-input"
                    type="email" 
                    id="email"/>
                <label
                    className={email.trim().length > 0 ? "form-label active-label" : "form-label"}
                    htmlFor="email">
                    your email
                </label>
            </section>
            <section className="form-group">
                <input 
                    value= {password}
                    onChange = {e => setPassword(() => e.target.value)}
                    autoComplete="off"
                    className="form-input"
                    type="password" 
                    id="password"/>
                <label
                    className={password.trim().length > 0 ? "form-label active-label" : "form-label"}
                    htmlFor="password">
                    your password
                </label>
            </section>
            <div className="form-btn-box">
                <button type="submit">Submit</button>
            </div>
        </form>
        <h3 className="form-redirect">
            Already have an account? 
            <Link to="/">Click here to login</Link>
        </h3>
    </>
    )
}

export default Register;

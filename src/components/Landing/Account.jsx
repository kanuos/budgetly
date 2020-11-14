import React, { useState, useEffect } from 'react';
import Brand from '../Nav/brand';
import {validField} from '../../utils';
import MiniLoader from '../Loader/miniLoader';
import {auth} from '../../controls/firebase'
import {register} from '../../controls/online'
import './index.css'

const Account1 = ({signIn}) => {
    const [signInMode, toggleMode] = useState(signIn)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [formError, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setLoading] = useState(false);

    function toggleFields() {
        toggleMode(() => !signInMode);
    }

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
        if(!signInMode){
            valid = validField("name", name, 2);
            if (!valid.isValid){
                setError(true)
                setMsg(() => valid.error)
                return
            }
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
        // const validData = !signInMode ? {email, name, password} : {email, password}

        // simulation of server side tnx
        setLoading(() => true);        
        if (signInMode){
            // login here
            auth.signInWithEmailAndPassword(email, password)
                .then(console.log)
                .catch(console.log)
        }
        else {
            register(email, password, name)
            .then((user) => {
                console.log(user);
                setMsg("user created successfully! Login to continue")
                clearFields();
                setTimeout(function(){
                    setMsg("")
                    setError(false);
                    toggleMode(!signInMode);
                }, 2500)
            })
            .catch(err =>{
                setError(true);
                setMsg(err.message);
            })
            .finally(() =>setLoading(false))    
        }
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
                <h2 className="form-title">{signInMode ? "login" : "register"}</h2>
                {msg.length > 0 && <strong className={formError ? "form-error" : "form-success"}>
                    {msg}
                </strong>}
                {isLoading && <div className="form-loader-box">
                    <MiniLoader />
                </div>}
            </header>
        { !signInMode && 
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
            </section>}
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
    {signInMode ?
        <>Don't have an account? <em onClick={toggleFields}>Click here to register</em></>
        :
        <>Already have an account? <em onClick={toggleFields}>Click here to login</em></>
    }
        </h3>
        </>
    )
}

export default Account1

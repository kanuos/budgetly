import React, { useState, useEffect, useContext } from 'react';
import Brand from '../Nav/brand';
import {validField} from '../../utils';
import MiniLoader from '../Loader/miniLoader';
import { logIn} from '../../controls/online'
import './index.css'
import { Link, useHistory } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

const Login = () => {
    const {user} = useContext(LoginContext);
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [formError, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if(user){
            history.push("/dashboard")
        }
        return () => setLoading(false);
    }, [user, history])

    useEffect(()=> {
        const popupMsg = setTimeout(()=> {
            setError(false);
            setMsg("");
        }, 2000);
        return () => clearTimeout(popupMsg);
    }, [msg])

    async function handleSubmit(e) {
        e.preventDefault();
        let valid = null
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
        logIn(email, password)
        .then(() => {
            setLoading(()=> false);
        })
        .catch(err => {
            setError(true);
            setMsg(err.message);
        })
    }
    return (
        <>
        <form onSubmit = {handleSubmit} className="account-form">
            <header className="form-header">
                <Brand />
                <h2 className="form-title">
                    login
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
            Don't have an account? 
            <Link to="/register">Click here to register</Link>
        </h3>
    </>
    )
}

export default Login

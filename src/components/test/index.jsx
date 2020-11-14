import React, {useState} from 'react'
import {auth} from '../../controls/firebase'

const TestMode = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    
    function handleRegister(e) {
        e.preventDefault();
        if (name.trim().length === 0) {
            setMsg("Name cannot be empty")
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(user => {
                user.displayName = name
                console.log(user);
            })
            .catch(err => {
                setMsg(() =>err.message)
                setEmail("");
                setPassword("")
                setName('')
            })
    }

    function handleLogin(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(console.log)
            .catch(err => {
                setMsg(() =>err.message)
                setEmail("");
                setPassword("")
                setName('')
            })
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <h2>{msg}</h2>
                <h1>Register</h1>
                <input
                    value={name} 
                    placeholder="Name"
                    onChange={e => setName(e.target.value)} 
                    type="text"/><br/>
                <input
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    type="text"/><br/>
                <input
                    value={password} 
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)} 
                    type="text"/><br/>
                <button>
                    Submit
                </button>
            </form>
            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    type="text"/><br/>
                <input
                    value={password} 
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)} 
                    type="text"/><br/>
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default TestMode

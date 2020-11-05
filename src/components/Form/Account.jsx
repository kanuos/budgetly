import React, {useState} from 'react'

const Account = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit(event) {
        event.preventDefault();
        // check for front end validations
        console.log(firstName, lastName, email, password);
    }

    return (
        <div className="row">
            <form 
                onSubmit = {handleSubmit}
                className="col s12" 
                autoComplete="off">
            <div className="row">
                <div className="input-field col s6">
                    <input 
                        id="first_name" 
                        type="text" 
                        value = {firstName}
                        onChange = {e => setFirstName(e.target.value)}
                        className="validate" />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                    <input 
                        id="last_name" 
                        value = {lastName}
                        onChange = {e => setLastName(e.target.value)}
                        type="text" 
                        className="validate" />
                    <label htmlFor="last_name">Last Name</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input 
                        id="email" 
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                        type="email" 
                        className="validate" />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input 
                        id="password" 
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        type="password" 
                        className="validate" />
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <button 
                    className="btn waves-effect waves-light local-btn">
                    <i className="material-icons left prefix">login</i>
                    Submit
                </button>
            </div>
            </form>
        </div>
    )
}

export default Account

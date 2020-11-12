import React, { useState } from 'react'
import Form from './Form';
import './index.css'

const Account = ({signIn}) => {
    const fieldOpts = {
        login : ["email", "password"],
        register : ["name", "email", "password"]
    }
console.log(signIn);
    const [loginMode, setMode] = useState(signIn);
    const [fields, setFields] = useState(signIn ? [...fieldOpts.login] : [...fieldOpts.register])
    const [title, setTitle] = useState(signIn ? "login" : "register");

    function toggleFields() {
        if (loginMode){
            setFields(() => [...fieldOpts.register])
            setTitle("register");
        }
        else {
            setFields(() => [...fieldOpts.login])
            setTitle("login");
        }
        setMode(() => !loginMode);
    }

    return (
        <>
        <Form>
            {{fields, title}}
        </Form>
        <h3 className="form-redirect">
            {
            title === "login" ?
            <>Don't have an account? <em onClick={toggleFields}>Click here to register</em></>
            :
            <>Already have an account? <em onClick={toggleFields}>Click here to login</em></>
            }
        </h3>
        </>
    )
}

export default Account

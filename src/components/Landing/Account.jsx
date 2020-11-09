import React, { useState } from 'react'
import Form from './Form';
import './index.css'

const Account = () => {
    const fieldOpts = {
        login : ["email", "password"],
        register : ["name", "email", "password"]
    }

    const [loginMode, setMode] = useState(false);
    const [fields, setFields] = useState([...fieldOpts.register])
    const [title, setTitle] = useState("register");

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

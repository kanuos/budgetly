import React, { createContext, useEffect, useState } from 'react'
import {auth} from '../controls/firebase';


export const LoginContext = createContext("");

const LoginContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(()=> {
        auth.onAuthStateChanged(usr => {
            if(usr){
                setUser(() => usr)
            }
        })
    }, [user])
    
    return (
        <LoginContext.Provider value={{user}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider

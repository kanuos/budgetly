import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom'
import Brand from '../Nav/brand';
import Loader from '../Loader'
import {logout} from '../../controls/online'
import './index.css';
import { LoginContext } from '../../contexts/LoginContext';

const Logout = (props) => {
    const [isLoading, setLoading] = useState(true);
    const {user} = useContext(LoginContext);

    useEffect(() => {
        if(user) {
            logout()
                .then(()=> {
                    setTimeout(()=> {
                        props.history.push("/");
                    }, 2000)
                })
        }
        else {
            props.history.push("/");
        }
        setLoading(false);
    }, [user, props]);

    return isLoading ? <Loader /> : (
        <div className="logout-page">
            <Brand />
            <h1 className="logout-msg">
                You have been logged out!
            </h1>
            <h2>
               Redirecting in 2 seconds..  
            </h2>
            <h2>
                Click <Link to="/">here</Link> to go to home
            </h2>
        </div>
    )
}

export default Logout

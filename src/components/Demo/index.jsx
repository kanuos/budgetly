import React, {useContext, useEffect, useState} from 'react';
import FooterContent from '../Footer/content';
import Nav from '../Nav/demo';
import Brand from '../Nav/brand';
import { Link } from  'react-router-dom'
import exit from '../../assets/exit.svg';
import add from '../../assets/new.svg';
import Loader from '../Loader'
import { LoginContext } from '../../contexts/LoginContext';
import './index.css';
import DemoTab from '../crudTab/Demo.jsx';

const Demo = (props) => {
    const {user} = useContext(LoginContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        if (user){
            props.history.push("/");
        }
    }, [user, props.history])
    

    return isLoading ? <Loader /> : (
        <div className="demo-wrapper">
        <Nav />
        <aside className="web-only aside-nav">
            <Brand />
            <ul className="aside-link-list">
                <li>
                <Link to={{
                    pathname : "/",
                    signIn : true
                }}>
                    <img
                        className="aside-link-icon" 
                        src={exit} 
                        alt="sign out"/>
                        sign In
                </Link>
                </li>
                <li>
                <Link to={{
                    pathname : "/",
                    signIn : false
                }}>
                    <img
                        className="aside-link-icon" 
                        src={add} 
                        alt="sign out"/>
                        register
                </Link>
                </li>
            </ul>
            <footer className="aside-footer">
                <FooterContent />
            </footer>
        </aside>
        <main>
            <div className="container">
                <DemoTab />
            </div>
        </main>
        </div>
    )
}

export default Demo

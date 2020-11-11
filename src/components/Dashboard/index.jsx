import React, { useState } from 'react';
import FooterContent from '../Footer/content';
import Nav from '../Nav';
import Brand from '../Nav/brand';
import Calculator from '../calculator'
import History from '../history'
import './index.css';
import profile from '../../assets/face.svg';
import exit from '../../assets/exit.svg';
import stats from '../../assets/stats.svg';
import calculate from '../../assets/calculate.svg';
import register from '../../assets/add.svg';
import CrudTab from '../crudTab';

const Dashboard = (props) => {
    // get the list for Crud Tab from props

    let temp = Date.now() %2 === 0;
    const [currentTab, setTab] = useState(1);

    const tabs = [
        "",
        "the ui for CRUD and list", 
        "history journals with two views : <Month, List>",
        "investment calculator",
        "sign out using router"
    ]
    
    function getTab(tab) {
        switch(tab){
            case "profile": setTab(() => 1); break;
            case "history": setTab(() => 2); break;
            case "calculator": setTab(() => 3); break;
            default: setTab(() => 1);
        }
    }

    return (
        <div className="dashboard-wrapper">
        <Nav tab={getTab}/>
        <aside className="web-only aside-nav">
            <Brand />
            {temp && <ul className="aside-link-list">
                <li>
                    <button onClick={() => setTab(1)}>
                    <img
                        className="aside-link-icon" 
                        src={profile} 
                        alt="profile"/>
                        profile
                    </button>
                </li>
                <li>
                    <button onClick={() => setTab(2)}>
                    <img
                        className="aside-link-icon" 
                        src={stats} 
                        alt="history"/>
                        history
                    </button>
                </li>
                <li>
                    <button onClick={() => setTab(3)}>
                    <img
                        className="aside-link-icon" 
                        src={calculate} 
                        alt="calculator"/>
                        calculator
                    </button>
                </li>
                <li>
                    <button onClick={() => setTab(4)}>
                    <img
                        className="aside-link-icon" 
                        src={exit} 
                        alt="sign out"/>
                        sign out
                    </button>
                </li>
            </ul>}
            {!temp && <ul className="aside-link-list">
                <li>
                    <button onClick={() => setTab(1)}>
                    <img
                        className="aside-link-icon" 
                        src={exit} 
                        alt="sign in"/>
                        sign in
                    </button>
                </li>
                <li>
                    <button onClick={() => setTab(2)}>
                    <img
                        className="aside-link-icon" 
                        src={register} 
                        alt="register"/>
                        register
                    </button>
                </li>
            </ul>}
            <footer className="aside-footer">
                <FooterContent />
            </footer>
        </aside>
        <main>
            <div className="container">
                {currentTab === 1 && <CrudTab />}
                {currentTab === 2 && <Calculator />}
                {currentTab === 3 && <History />}
            </div>
        </main>
        </div>
    )
}

export default Dashboard

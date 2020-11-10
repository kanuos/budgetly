import React, { useState } from 'react';
import FooterContent from '../Footer/content';
import Nav from '../Nav';
import Brand from '../Nav/brand';
import './index.css';
import profile from '../../assets/face.svg';
import exit from '../../assets/exit.svg';
import stats from '../../assets/stats.svg';
import calculate from '../../assets/calculate.svg';
import register from '../../assets/add.svg';
import {getCurrentMonth, getCurrentYear} from '../../utils'
import CrudTab from '../crudTab';

const Dashboard = (props) => {
    // const {tab, getTab} = props;
    let temp = Date.now() %2 === 0;
    const [currentTab, setTab] = useState(1);

    const tabs = [
        "",
        "the ui for CRUD and list", 
        "history journals with two views : <Month, List>",
        "investment calculator",
        "sign out using router"
    ]

    return (
        <div className="dashboard-wrapper">
        <Nav 
        />
        <aside className="web-only aside-nav">
            <Brand />
            {temp && <ul className="aside-link-list">
                <li>
                    <button onClick={() => setTab(1)}>
                    <img
                        className="aside-link-icon" 
                        src={profile} 
                        alt="profile"/>
                        {getCurrentMonth()} {getCurrentYear()}
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
                {currentTab !== 1 && <>Tab selected = {tabs[currentTab]} </>}
            </div>
        </main>
        </div>
    )
}

export default Dashboard

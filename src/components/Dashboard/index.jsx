import React from 'react';
import Nav from '../Nav';
import './index.css';

const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">
        <Nav />
        <aside className="web-only">
        </aside>
        <main>
            <div className="container">
                <h1>
                    Hello from dashboard
                </h1> 
            </div>
        </main>
        </div>
    )
}

export default Dashboard

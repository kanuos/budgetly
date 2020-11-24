import React from 'react';
import {AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area} from 'recharts'

const styleObj = {
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems : 'center',
}

const Analytics = ({data, type="inc"}) => {
    return (
        <div style={styleObj}>
        <AreaChart
            width={350}
            height={200}
            margin = {{top: 20, bottom : 10}}
            data={data.map(el => ({...el, amount : Number(el.amount)}))}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="amount" />
            <YAxis />
            <Tooltip dataKey="desc"/>
            <Area 
                type="monotone" 
                dataKey="amount" 
                stroke={type === 'inc' ? `var(--income-dark)` : 'var(--expense-dark'} 
                fill={type === 'inc' ? `var(--income)` : 'var(--expense'} />
        </AreaChart>   
        <span>
            {type === "inc" ? "Income transactions" : "Expense transactions"}
        </span>
        </div>
    )
}

export default Analytics

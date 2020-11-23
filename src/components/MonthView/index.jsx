import React from 'react'
import './index.css'

const Card = (props) => {
    const {year, tnx, month, getData} = props;
    let totalExp = 0, totalInc = 0;
    let incomeGtExpense ;
    tnx.forEach(item => {
        if (item.type === "exp"){
            totalExp += Number(item.amount)
        }
        else{
            totalInc += Number(item.amount)
        }
    })
    incomeGtExpense = totalInc > totalExp
    return (
        <article className={`month-card ${ incomeGtExpense ? "card-inc" : "card-exp"}`}>
            <h1>
                {month} {year}
            </h1>
            <ul>
                <li className={incomeGtExpense ? "active income" : "inactive"}>
                    <span>
                        Income :
                    </span>
                    <span>
                        {totalInc}
                    </span>
                </li>
                <li className={!incomeGtExpense ? "active expense" : "inactive"}>
                    <span>
                        Expense :
                    </span>
                    <span>
                        {totalExp}
                    </span>
                </li>
                <li className={incomeGtExpense ? "income" : "expense"}>
                    <span>
                        Saving :
                    </span>
                    <span>
                        {incomeGtExpense ? Math.floor((totalInc - totalExp) * 100 /totalInc) : 0}%
                    </span>
                </li>
            </ul>
            <button onClick={() => getData({year, tnx, month})}>
                Read More
            </button>
        </article>
    )
}

const MonthCard = ({transactions, year, getData}) => {
    return <>
    {Object.keys(transactions).map((month,i) => {
    return <Card 
                getData = {getData}
                key={i} 
                month = {month}
                tnx = {transactions[month]}
                year = {year} />
            })}
    </>
}


export default MonthCard

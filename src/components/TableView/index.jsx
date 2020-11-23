import React from 'react'
import './table.css'
import {htmlDateToLocal} from '../../utils'

const TableView = ({data}) => {
    return (
        <div>
        {Object.keys(data).map((datum, index) => {
            return (
            <dl key={index} className="report-table">
                <legend>
                    {datum} transaction
                </legend>
                {Object.values(data[datum]).map((el,i) => {
                    return <>
                        <dt key={index}>
                            {i % 2 === 0 ? "Income" : "Expense"}
                        </dt>
                        <dd className={i % 2 === 0 ? "income" : "expense"}>
                            {index === 0 ? el.toFixed(2) : <Item data = {el} />}
                        </dd>
                    </>
                })}
            </dl>
        )})}
        </div>
    )
}

export default TableView


const Item = ({data}) => {
    const {amount, desc, date} = data;
    return <ul className="list-string">
        {date && <li>
            {htmlDateToLocal(date)}
        </li>}
        <li>
            {desc}
        </li>
        <li>
            {amount}
        </li>
    </ul>
}
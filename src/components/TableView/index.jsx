import React from 'react'
import './table.css'
import {htmlDateToLocal} from '../../utils'

const TableView = ({data}) => {
    let key = 0;
    return (
        <div>
        {Object.keys(data).map((datum, index) => {
            return (
            <dl key={datum} className="report-table">
                <legend>
                    {datum} transaction
                </legend>
                {Object.values(data[datum]).map((el,i) => {
                    key++;
                    return <span key={key}>
                        <dt>
                            {i % 2 === 0 ? "Income" : "Expense"}
                        </dt>
                        <dd className={i % 2 === 0 ? "income" : "expense"}>
                            {index === 0 ? el.toFixed(2) : <Item data = {el} />}
                        </dd>
                    </span>
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
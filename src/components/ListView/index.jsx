import React from 'react'
import edit from '../../assets/edit.svg'
import remove from '../../assets/delete.svg'
import {htmlDateToLocal} from '../../utils'
import './index.css'

const Table = ({data}) => {
    return (
        <>
        {data.map(datum => {
        const {type, id, date, desc, amount} = datum;
        return (
            <tr className={type} key={id}>
                 <td data-label="Date">
                      {htmlDateToLocal(date) !=="Invalid Date" ? htmlDateToLocal(date) : new Date(date).toLocaleDateString()}
                 </td>
                 <td data-label="Description">{desc}</td>
                 <td data-label="Type">{type === "exp" ? "Expense" : "Income"}</td>
                 <td data-label="Amount">${amount}</td>
                 <td data-label="Actions">
                   <button>
                     <img src={edit} alt=""/>
                   </button>
                   <button>
                     <img src={remove} alt=""/>
                   </button>
                 </td>
             </tr>
            )
        })}
        </>
    )
}


const ListView = (props) => {
    const {year, transactions} = props;
    return (
        <article className="month-list">
            <h1>{year}</h1>
            <table>
      <thead>
        <tr>
          <th>date</th>
          <th>description</th>
          <th>type</th>
          <th>amount</th>
          <th>actions</th>
        </tr>
      </thead>
      
        {Object.keys(transactions).map(month => {
        return <tbody key={month}>
                <Table data={transactions[month]} />
                </tbody>
            })}
    </table>
      </article>
    )
}

export default ListView




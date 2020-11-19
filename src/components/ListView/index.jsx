import React from 'react'
import './index.css'

const Table = ({data}) => {
    return (
        <>
        {data.map((datum, index) => {
        const {type, id, date, desc, amount} = datum;
        return (
            <tr className={type} key={id}>
                 <td data-label="ID">{index + 1}</td>
                 <td data-label="Date">{date}</td>
                 <td data-label="Description">{desc}</td>
                 <td data-label="Type">{type === "exp" ? "Expense" : "Income"}</td>
                 <td data-label="Amount">${amount}</td>
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
          <th>#</th>
          <th>date</th>
          <th>description</th>
          <th>type</th>
          <th>amount</th>
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




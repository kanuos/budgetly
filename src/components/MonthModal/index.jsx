import React from 'react'
import './index.css'

const MonthModal = () => {
    return (
        <section className="month-modal">
            <button className="close-modal">&times;</button>
            <div className="container">
                <button className="crud-btn">
                    +
                </button>
                <header className="month-header">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam a numquam adipisci, at harum asperiores totam architecto minus quam nesciunt?
                </header>
                <section className="month-graph-box">
                    <h1>
                        Graphs go here
                    </h1>
                </section>
                <section className="month-transactions-list">
                    <article className="income-list">
                        <h1>Incomes</h1>
                    </article>
                    <article className="expense-list">
                        <h1>Expenses</h1>
                    </article>
                </section>
            </div>
        </section>
    )
}

export default MonthModal

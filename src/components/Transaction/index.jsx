import React, {useState} from 'react';
import './index.css';
import remove from '../../assets/delete.svg'
import edit from '../../assets/edit.svg'
// import add from '../../assets/add.svg'

const Transaction = (props) => {
    const [showOptions, toggleShowOptions] = useState(false);
    const {desc, amount, date = new Date().toDateString()} = props;
    return (
        <article className="transaction-entry">
        <section className="transaction-desc">
            <span>
                {desc}
            </span>
            <em>{date}</em>
            <u 
                data-text="see options"
                onClick={() => toggleShowOptions(!showOptions)}>
                &#9881; 
            </u>

            <div className={`transaction-control-box ${!showOptions ? "hide-options":"show-options"}`}>
                <button 
                    title="Edit Transaction"
                    className="transaction-btn">
                    <img src={edit} alt="edit transaction"/>
                </button>
                <button
                    title="Delete Transaction"
                    className="transaction-btn">
                    <img src={remove} alt="delete transaction"/>
                </button>
                <button
                    title="Hide Options"
                    className="transaction-btn" 
                    onClick={() => toggleShowOptions(!showOptions)}>
                    <span>
                        &times;
                    </span>
                </button>
            </div>
        </section>
        <section className="transaction-amount">
            {amount}
        </section>
        </article>
    )
}

export default Transaction

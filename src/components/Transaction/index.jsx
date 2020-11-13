import React, {useState} from 'react';
import './index.css';
import removeIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import {formatHTMLDate} from '../../utils'

const Transaction = (props) => {
    const [showOptions, toggleShowOptions] = useState(false);
    const {id, desc, amount, edit, remove , type, date} = props;
    return (
        <article className="transaction-entry">
        <section className="transaction-desc">
            <span>
                {desc}
            </span>
            <em>{formatHTMLDate(date)}</em>
            <u 
                data-text="see options"
                onClick={() => toggleShowOptions(!showOptions)}>
                &#9881; 
            </u>

            <div className={`transaction-control-box ${!showOptions ? "hide-options":"show-options"}`}>
                <button 
                    onClick = {() => {
                        edit(id,"edit")
                        toggleShowOptions(!showOptions)
                    }}
                    title="Edit Transaction"
                    className="transaction-btn">
                    <img src={editIcon} alt="edit transaction"/>
                </button>
                <button
                    onClick = {() => {
                        remove(id,"remove")
                        toggleShowOptions(!showOptions)
                    }}
                    title="Delete Transaction"
                    className="transaction-btn">
                    <img src={removeIcon} alt="delete transaction"/>
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
        <section className={`transaction-amount ${type}`}>
            {amount}
        </section>
        </article>
    )
}

export default Transaction

import React, { useState } from 'react'

const AddEdit = () => {
    const [modal, setModal] = useState(false);
    return (
        <div>
            <button 
                onClick = {() => setModal(!modal)}
                className="waves-effect waves-light btn btn-floating modal-trigger">
                    <i className="material-icons left prefix">add</i>
            </button>

            <div 
                className={modal ? "basic-modal modal-open":"basic-modal modal-close"}>
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <button 
                        onClick = {() => setModal(!modal)}
                        className="modal-close waves-effect waves-green btn-flat">
                        Agree
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEdit

import React, {useState, useEffect} from 'react'
import './index.css'

const InputGroup = props => {
    const {type, placeholder, initialValue="", getValue, errorMsg=""} = props;
    const [value, setValue] = useState(initialValue);
    
    useEffect(()=> {
        getValue(value);
    }, [value])

    return (
        <section className="account-input-group">
            <input 
                type={type}
                value={value}
                className={value.length > 0 && 'show-label'}
                onChange = {e => setValue(e.target.value)} 
                placeholder={placeholder}/>
            <label>
                {placeholder}
            </label>
            <span className={errorMsg.length > 0 ? "err" : "no-err"}>
                {errorMsg}
            </span>
        </section>
    )
}

export default InputGroup

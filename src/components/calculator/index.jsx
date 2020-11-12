import React, {useState} from 'react';
import Brand from '../Nav/brand'
import './index.css'

const Calculator = () => {
    const [investment, setInvestment] = useState(0);
    const [roi, setRoi] = useState(5);
    const [period, setPeriod] = useState(10);
    const [frequency, setFrequency] = useState(10);
    
    const handleChange = e => {

    }

    return (
    <>
    <article className="calculator-box">
        <section className="calculator-form-box">
            hello 
            {/* <Form>
                {{
                    title : "Investment plannar",
                    fields : ["initial investment", "rate of interest", "period of investment","compounding frequency"]
                }}
            </Form> */}
        </section>
        <section className="calculator-result">

        </section>
    </article>
    </>    
    )
}

export default Calculator

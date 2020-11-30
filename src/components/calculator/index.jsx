import React, {useState, useEffect} from 'react';
import Brand from '../Nav/brand'
import './index.css'
import {getAllTnxByUser} from '../../controls/online';
import {investmentPlan, arrayGroupByYearAndMonth } from '../../utils'
import {XAxis, YAxis,CartesianGrid, LineChart, Line, Tooltip, ResponsiveContainer} from 'recharts'

const helper = {
    investment: {
        regular : "Initial investment amount. This is a one time investment",
        error: "Initial investment is required"
    },
    contribution: {
        regular : `This is how much your yearly contributions are going to be.`,
        error: ` contributions must be at least 100.`
    },
    roi: {
        regular : `This is the expected annual rate of interest your investments will grow by. On an average, ROI ranges between 4% to 6%`,
        error: `ROI is required`
    },
    period: {
        regular : `This is the entire duration of your investment in years.`,
        error: `Invesment period is required`
    },
    compounding : {
        regular : "This is the frequency at which your investments and contributions will apply the rate of interest"
    },
    frequency : {
        regular : "This is how frequently you are going to contribute. To maximize profit, contribution frequency should be the least."
    }
}


const Calculator = () => {
    const [investment, setInvestment] = useState(0);
    const [contribution, setContribution] = useState(0);
    const [roi, setRoi] = useState("");
    const [period, setPeriod] = useState("");
    const [frequency, setFrequency] = useState("month");
    const [result, setResult] = useState(false);
    const [investmentHelper, setInvestmentHelper] = useState(helper.investment.regular) 
    const [investmentError, setInvestmentError] = useState(false) 
    const [contributionHelper, setContributionHelper] = useState(helper.contribution.regular) 
    const [contributionError, setContributionError] = useState(false) 
    const [roiHelper, setRoiHelper] = useState(helper.roi.regular) 
    const [roiError, setRoiError] = useState(false) 
    const [periodHelper, setPeriodHelper] = useState(helper.period.regular) 
    const [periodError, setPeriodError] = useState(false) 
    const [future, setFuture] = useState(0);
    const [futureCurrentRate, setFutureCurrent] = useState(0);

    const [currentContribution, setCurrentContribution] = useState(0);
    const [currentInitalInvestment, setCurrentInitalInvestment] = useState(0);

    const handleSubmit = e => {
        e.preventDefault();
        if (Number(investment) === 0){
            setInvestmentHelper(() => helper.investment.error)
            setInvestmentError(() => true)
            return;
        }
        if (Number(contribution) === 0){
            setContributionHelper(() => helper.contribution.error)
            setContributionError(() => true)
            return;
        }
        if (Number(period) === 0){
            setPeriodHelper(() => helper.period.error)
            setPeriodError(() => true)
            return;
        }
        if (Number(roi) === 0){
            setRoiHelper(() => helper.roi.error)
            setRoiError(() => true)
            return;
        }
        setResult(!result)
        setFuture(() => investmentPlan(
                Number(investment),
                Number(roi),
                Number(period),
                frequency,
                Number(contribution)))
        setFutureCurrent(() => investmentPlan(
                Number(currentInitalInvestment),
                Number(roi),
                Number(period),
                frequency,
                Number(currentContribution)))
    }

    useEffect(()=> {
        getAllTnxByUser()
            .then(data => {
                const monthObj = arrayGroupByYearAndMonth(data)
                let totalMonths =0; 
                Object.keys(monthObj).forEach(yr => {
                    totalMonths += Object.keys(monthObj[yr]).length;
                });
                let incs = 0, exps = 0;
                data.forEach(datum => {
                    switch(datum.type){
                        case "inc":
                            incs += Number(datum.amount)
                            break
                        default:
                            exps += Number(datum.amount)
                    }
                })
                if (incs >= exps){
                    setCurrentInitalInvestment(() => incs - exps);
                    setCurrentContribution(() => Math.round((incs - exps) /totalMonths)* 12);
                    
                    setInvestment(() => incs - exps);
                    setContribution(() => Math.round((incs - exps) /totalMonths)* 12);
                    
                }
            })
            .catch()
    }, [])

    useEffect(()=> {
        let popup = setTimeout(function(){
            setInvestmentError(false);
            setInvestmentHelper(helper.investment.regular)
        }, 2000)
        return () => clearTimeout(popup);
    }, [investmentError])
    
    useEffect(()=> {
        let popup = setTimeout(function(){
            setContributionError(false);
            setContributionHelper(helper.contribution.regular)
        }, 2000)
        return () => clearTimeout(popup);
    }, [contributionError])
    
    useEffect(()=> {
        let popup = setTimeout(function(){
            setPeriodError(false);
            setPeriodHelper(helper.period.regular)
        }, 2000)
        return () => clearTimeout(popup);
    }, [periodError])
    
    useEffect(()=> {
        let popup = setTimeout(function(){
            setRoiError(false);
            setRoiHelper(helper.roi.regular)
        }, 2000)
        return () => clearTimeout(popup);
    }, [roiError])
    

    return (
    <>
    <article className="calculator-box">
        <header className="calculator-header">
            <Brand />
            <strong>
                Investment Calculator
            </strong>
        </header>
        <section className={`calculator-form-box ${result ? "smaller" : "regular"}`}>
            <form 
                onSubmit = {handleSubmit}
                className={`calculator-form ${result ? "smaller":"regular"}`}>
                <div className={investmentError ? "error form-group" : "form-group"}>
                    <input 
                        type="number" 
                        min="0"
                        value = {investment}
                        onChange = {e => setInvestment(e.target.value)}
                        className="form-input"/>
                    <label className={investment > 0 ? "current-label" : ""}>
                        Initial Investment
                    </label>
                    <span className={investmentError ? "helper error" : "helper"}>
                        {investmentHelper}
                    </span>
                </div>
                <div className={contributionError ? "error form-group" : "form-group"}>
                    <input 
                        min="100"
                        type="number" 
                        value = {contribution}
                        onChange = {e => setContribution(e.target.value)}
                        className="form-input"/>
                    <label className={contribution > 0 ? "current-label":""}>
                        annual contribution
                    </label>
                    <span className={contributionError ? "helper error" : "helper"}>
                        {contributionHelper}
                    </span>
                </div>
                <div className={periodError ? "error form-group" : "form-group"}>
                    <input 
                        min="1"
                        max="99"
                        type="number" 
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                        className="form-input"/>
                    <label className={period.length > 0 ? "current-label" : ""}>
                        Period
                    </label>
                    <span className={periodError ? "helper error" : "helper"}>
                        {periodHelper}
                    </span>
                </div>
                <div className={roiError ? "error form-group" : "form-group"}>
                    <input 
                        min="1"
                        type="number" 
                        step=".25"
                        value = {roi}
                        onChange = {e => setRoi(e.target.value)}
                        className="form-input"/>
                    <label className={roi.length > 0 ? "current-label": ""}>
                        Rate of interest
                    </label>
                    <span className={roiError ? "helper error" : "helper"}>
                        {roiHelper}
                    </span>
                </div>
                <div className="form-group select">
                    <label className="current-label">
                        Compounding frequency
                    </label>
                    <select 
                        value={frequency}
                        onChange={e => setFrequency(e.target.value)}>
                            <option value="month">Monthly</option>
                            <option value="quarter">Quarterly</option>
                            <option value="halfYear">Semi Yearly</option>
                            <option value="year">Annually</option>
                    </select>
                    <span className="helper">
                        {helper.compounding.regular} 
                    </span>
                </div>
                <div className="btn-container">
                 <button>Get results</button>

                </div>
            </form>
        </section>
        <section 
        className={`calculator-result ${!result ? "smaller" : "regular"}`}
        >
            <ul>
                <li>
                    <span>
                        initial investment
                    </span>
                    <span>
                        {investment}
                    </span>
                </li>
                <li>
                    <small>
                        current savings
                    </small>
                    <small>
                        {currentInitalInvestment}
                    </small>
                </li>
                <li>
                    <span>
                        Annual contribution
                    </span>
                    <span>
                        {contribution}
                    </span>
                </li>
                <li>
                    <small>
                        your current annual contribution
                    </small>
                    <small>
                        {currentContribution}
                    </small>
                </li>
                <li>
                    <span>
                        Investment Period
                    </span>
                    <span>
                        {period} years
                    </span>
                </li>
                <li>
                    <span>
                        compounding frequency
                    </span>
                    <span>
                        {frequency}ly
                    </span>
                </li>
                <li>
                    <span>
                        rate of interest (annually)
                    </span>
                    <span>
                        {roi}%
                    </span>
                </li>
                <li>
                    <span>
                        total contribution
                    </span>
                    <span>
                        {Number(contribution * period) + Number(investment)}
                    </span>
                </li>
                {future.PV && <li>
                    <span>
                        Return on Investment 
                    </span>
                    <span>
                        {future.PV.toFixed(2)}
                    </span>
                </li>}
                {futureCurrentRate.PV && <li>
                    <small>
                        Return on Investment
                        <br/>
                        <sub>
                            @ current savings rate
                        </sub> 
                    </small>
                    <small>
                        {futureCurrentRate.PV.toFixed(2)}
                    </small>
                </li>}
            </ul>

        {future.steps && <div className="result-graph">
            <LineChart 
                data={future.steps} 
                width={350} 
                height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone" 
                    dataKey="end" 
                    stroke="var(--income-dark)" />
            </LineChart>
            <LineChart 
                data={futureCurrentRate.steps} 
                width={350} 
                height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone" 
                    dataKey="start" 
                    stroke="var(--expense)" />
            </LineChart>
        </div>}
        {future.steps &&
            <> 
            <strong className="result-table-heading">
                Investment chart
            </strong>
            <table className="result-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Starting Balance</th>
                            <th>Interest</th>
                            <th>Ending Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {future.steps.map((datum, index) => (
                        <tr key={index}>
                            <td data-label="Year">{index + 1}</td>
                            <td data-label="Starting balance">{datum.start}</td>
                            <td data-label="Interest">{datum.interest}</td>
                            <td data-label="ending balance">{datum.end}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </>}

            <button className="go-back-btn"
            onClick={() => {
                setResult(() => !result)
                setPeriod(() => "")
                setRoi(() => "")
            }}>
                Go Back   
            </button>
        </section>
    </article>
    </>    
    )
}

export default Calculator


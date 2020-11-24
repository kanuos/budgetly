import React, {useState, useEffect} from 'react';
import Brand from '../Nav/brand'
import './index.css'
import {getAllTnxByUser} from '../../controls/online';
import {compoundInterest, simpleInterest, investmentPlan, arrayGroupByYearAndMonth } from '../../utils'

const helper = {
    investment: {
        regular : "Initial investment amount. This is a one time investment",
        error: "Initial investment is required"
    },
    contribution: {
        regular : `This is how much your  contributions are going to be.`,
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
    const [contributionFrequency, setContributionFrequency] = useState("month");
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
    const [CInterest, setCInterest] = useState(0);
    const [SInterest, setSInterest] = useState(0);
    const [future, setFuture] = useState(0);

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
        // A = P(1 + r/n)^nt
        // const value =Number(investment) * Math.pow((1 + Number(roi)/N), (N * Number(period)));
        setCInterest(compoundInterest(investment,roi,period,frequency));
        setSInterest(simpleInterest(investment,roi, period));
        setFuture(investmentPlan(investment,roi,period,frequency,contribution, contributionFrequency))
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
                    setInvestment(() => incs = exps)
                    setContribution(() => Math.round((incs = exps)/totalMonths))
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
        <section className="calculator-form-box">
            <header className="calculator-header">
                <Brand />
                <strong>
                    Investment Calculator
                </strong>
            </header>
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
                        contribution
                    </label>
                    <span className={contributionError ? "helper error" : "helper"}>
                        {contributionHelper}
                    </span>
                </div>
                <div className="form-group select">
                    <label className="current-label">
                        contribution frequency
                    </label>
                    <select 
                        value={contributionFrequency} 
                        onChange={e => setContributionFrequency(e.target.value)}>
                            <option value="month">Monthly</option>
                            <option value="quarter">Quarterly</option>
                            <option value="halfYear">Semi Yearly</option>
                            <option value="year">Annually</option>
                    </select>
                    <span className="helper">
                        {helper.frequency.regular}
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
            <h2>
                your results
            </h2>    
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
                    <span>
                        {contributionFrequency}ly contribution
                    </span>
                    <span>
                        {contribution}
                    </span>
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
                        {contribution * contributionFrequency * period}
                    </span>
                </li>
            </ul>
            <h2>
                Amount on CI = {CInterest.toFixed(2)} <br/>
                Amount on SI = {SInterest + Number(investment)} <br/>
                Investment will yeild = {future.toFixed(2)}
            </h2>
            <button onClick={() => setResult(!result)}>Get results</button>
        </section>
    </article>
    </>    
    )
}

export default Calculator

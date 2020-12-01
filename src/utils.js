export const today = {
    day : new Date().getDate(),
    month : new Date().getMonth() + 1,
    year : new Date().getFullYear(),
    toString(){
        return `${this.year}-${doubleDigit(this.month)}-${doubleDigit(this.day)}`;
    }
}

export const firstDayOfMonth = {
    month : new Date().getMonth() + 1,
    year : new Date().getFullYear(),
    toString(){
        return `${this.year}-${doubleDigit(this.month)}-01`;
    }
}

export function lastDayOfDate(htmlDate){
    let [yyyy,mm,dd] = htmlDate.split('-');
    if (leapYear(Number(yyyy)) && Number(mm) === 2){
        dd = 29;
    }
    else if (mm === 1 || mm === 3 || mm === 5 || mm === 7 || mm === 8 ||mm === 10 ||mm === 12){
        dd = 31;
    }
    else dd = 30;
    const last =formatHTMLDate(`${yyyy}-${mm}-${doubleDigit(dd)}`) 

    return new Date(last).getTime() > Date.now() ? 
    {last : today.toString()} : {last}
}

function leapYear(year){
    if(year%4 === 0){
        if (year % 100 === 0){
            if (year % 400 === 0)
                return true;
            return false;
        }
        return true;
    }
    return false;
}

export const doubleDigit = number => {
    number = Number(number);
    return number < 10 ? `0${number}` : number;
}

export const validMinimumLength = (word, length) => {
    return word.toString().trim().length >= parseInt(length);
}

export const validateDateString = date => {
    if (!date){
        return false;
    }
    const [y, m, d] = date.split('-');
    return !isNaN(y && m && d)
}

export const getCustomTimeObject = dateStr => {
    if (validateDateString(dateStr)){
        let date = new Date(dateStr);
        return {
            date : dateStr,
            stamp : date.getTime(),
            month : getCurrentMonth(date.getUTCMonth()),
            year : date.getUTCFullYear()
        }
    }
    return null;
}

export function formatHTMLDate(date){
    const [yyyy,mm,dd] = date.split('-');
    return `${dd}-${getCurrentMonth(mm - 1)}-${yyyy}`;
}

export const getCurrentMonth = (month=new Date().getMonth()) => {
    const months = ['jan', 'feb', 'mar', 'apr', 'may','jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months[month]
}

export const getCurrentYear = (day=Date.now()) => {
    return new Date(day).getFullYear();
}

export const createObjectFromArray = (array) => {
    const obj = {};
    array.forEach(el => obj[el] = "")
    return obj;
}

export const isValidEmail = emailStr => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(emailStr)
}


export const validField = (field, value, min=6) => {
    field = field.toLowerCase();
    const result = {};
    let isValid;
    switch(field){
        case "password":
        case "name":
            isValid = validMinimumLength(value, min)
            result.isValid = isValid;
            if (!isValid){
                result.error = `${field} must be at least ${min} characters long`;
            }
            break;
        case "email":
            isValid = isValidEmail(value)
            result.isValid = isValid;
            if (!isValid){
                result.error = "Email cannot be empty and must be valid.";
            }
            break;
        case "roi":
        case "amount":
        case "period":
            isValid = !isNaN(value)
            result.isValid = isValid;
            if (!isValid){
                result.error = `${field} must be a valid number`;
            }
            break;
        default:
            isValid = validMinimumLength(value, min)
            result.isValid = isValid;
            if (!isValid){
                result.error = `${field} must be at least ${min} characters long`;
            }
            break;
    }
    return result;
}

export function frequencyToInt(frequency){
    switch(frequency){
        case "month": return  12
        case "quarter": return  4
        case "halfYear": return  2
        default : return  1; 
    }
}


export function compoundInterest(Principal, roi, period, frequency) {
    // A = P(1 + r/n)nt
    let r = Number(roi), p = Number(Principal), t = Number(period), n=frequencyToInt(frequency);
    
    return p * Math.pow((1 + r/(100 * n)), (n*t));
}

export function simpleInterest(Principal, roi, period){
    // A = P + PTR/100
    let P = Number(Principal), t = Number(period), r = Number(roi);
    return P * t * r / 100;
}


export function investmentPlan(PV, roi, period, compounding_frequency, contribution){
    const frequency = {
        "month": 12,
        "quarter": 4,
        "halfYear": 2,
        "year": 1
    }
    const steps = []
    for(let year = 0;  year < period; year++){
        let stepData = {}
        stepData.start = Math.round(PV);
        for(let i = 0; i< frequency[compounding_frequency]; i++){
            PV *= (1 + roi/frequency[compounding_frequency]/100)
        }
        stepData.interest = Math.round(PV) -  stepData.start;
        PV += contribution
        stepData.end = Math.round(PV)
        steps.push(stepData)
        stepData = {}
    }

    return {
        PV, steps
    }

}

// get monthly data

function arrayGroupByField(list=[], field) {
	const obj = {}
	list.forEach(item => {
		obj[item[field]] = list.filter(el => el[field] === item[field]);
	})
	return obj;
}


export function arrayGroupByYearAndMonth(list= []){
	list.sort((a,b) => a.year - b.year);	
	
	const yearObj = arrayGroupByField(list, "year");
	const finalData = {};
	Object.keys(yearObj).forEach(year => {
		finalData[year] = arrayGroupByField(yearObj[year], "month")
	})
	return (finalData);
}


export function greetUser(){
    const time = new Date().toLocaleTimeString();
    return time;
}


export function htmlDateToLocal(htmlDate) {
    const [y,m,d] = htmlDate.split('-');
    return new Date(`${y}-${m}-${doubleDigit(Number(d) + 1)}`).toLocaleDateString();
}
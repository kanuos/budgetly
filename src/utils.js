export const today = {
    day : new Date().getUTCDate(),
    month : new Date().getUTCMonth() + 1,
    year : new Date().getUTCFullYear(),
    toString(){
        return `${this.year}-${doubleDigit(this.month)}-${doubleDigit(this.day)}`;
    }
}

export const firstDayOfMonth = {
    month : new Date().getUTCMonth() + 1,
    year : new Date().getUTCFullYear(),
    toString(){
        return `${this.year}-${doubleDigit(this.month)}-01`;
    }
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
        const date = new Date(dateStr);
        return {
            stamp : date.getTime(),
            month : getCurrentMonth(date.getUTCMonth()),
            year : date.getUTCFullYear()
        }
    }
    return null;
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
                result.error = "Invalid Email";
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
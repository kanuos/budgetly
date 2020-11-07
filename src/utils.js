export const today = {
    day : new Date().getUTCDate(),
    month : new Date().getUTCMonth() + 1,
    year : new Date().getUTCFullYear(),
    toString(){
        return `${this.year}-${doubleDigit(this.month)}-${doubleDigit(this.day)}`;
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
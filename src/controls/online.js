import {auth, store} from './firebase';
import {getCurrentMonth, getCurrentYear} from '../utils'

// AUTH ACTIONS

export function register(email, password, name) {
    return new Promise((resolve, reject) => {
        try{
            resolve(
                auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    auth.currentUser.updateProfile({
                        displayName : name
                      })
                    return auth.currentUser;    
                })
            )
        }
        catch(err){
            reject(err);
        }
    })
}

export function logIn(email, password) {
    return new Promise((resolve, reject) => {
        try {
            resolve(auth.signInWithEmailAndPassword(email, password))
        }
        catch(err){
            reject(err);
        }
    })
}

export function logout(){
    return auth.signOut()
}



// STORE ACTIONS

const tnx = store.collection("transactions");

export function addTransaction(entry) {
    if (auth.currentUser){
        entry.uid = auth.currentUser.uid;
        tnx.doc(entry.id).set(entry)
        .catch(err => err)
    }
    else {
        throw Error("Not logged in")
    }
}

export async function getAllTnxByUser() {
    const transactions = [];
    try {
        const list = await tnx.where("uid","==",auth.currentUser.uid).get()
        if (list.empty){
            return transactions;
        }

        list.forEach(el => {
            transactions.push(el.data())
        })
        
        return transactions;
    }
    catch(err){
        return transactions;
    }
}

export async function getCurrentMonthTnxByUser(month = getCurrentMonth(), year =  getCurrentYear()) {
    const transactions = [];
    try {
        const list = await tnx.where("uid","==",auth.currentUser.uid)
                        .where("month", "==", month)
                        .where("year","==", year)
                        .get()
        
        list.forEach(el => {
            transactions.push(el.data())
        })
        
        return transactions;
    }
    catch(err){
        return transactions;
    }
}

export async function deleteTnx(tnxID){
    console.log(tnxID);
    return tnx
    .doc(tnxID)
    .delete()
}
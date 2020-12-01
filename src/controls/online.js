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

let tnx = store.collection(`transactions`);

export function addTransaction(entry) {
    try{
        entry.uid = auth.currentUser.uid;
        return tnx
        .doc(entry.id)
        .set(entry)
    }
    catch(err) {
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
        
        return transactions.sort((a,b) => a.stamp - b.stamp);
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
    return tnx
    .doc(tnxID)
    .delete()
}

export async function getItemToEdit(tnxID){
    return new Promise((resolve, reject) => {
        try {
            resolve(tnx.doc(tnxID)
            .get()
            .then(doc => {
                if (doc.exists){
                    return doc.data();
                }
                return null;
            }))
        }
        catch(err){
            reject(err);
        }
    })
}
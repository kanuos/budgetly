import {auth} from './firebase';

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
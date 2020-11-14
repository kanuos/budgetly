import {auth} from './firebase';

export function register(email, password, name) {
    return new Promise((resolve, reject) => {
        try{
            resolve(
                auth.createUserWithEmailAndPassword(email, password)
                .then(user => {
                    user.displayName = name;
                    return user;    
                })
            )
        }
        catch(err){
            reject(err);
        }
    })
}
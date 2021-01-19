import setAuthToken from './setAuthToken';
import jwt from 'jsonwebtoken'
class Auth {
    constructor() {
        this.authenticated = false;
    }
    login(cb) {
        this.authenticated = true;
    }
    logout(cb) {
        localStorage.removeItem("userToken");
        this.authenticated = false;
    }
    isAuthenticated() {
        if(this.getToken()){
            const token = localStorage.userToken
            const {iat, exp} = jwt.decode(token)
            const timestamp = Math.floor(new Date().getTime() / 1000)
            
            if(exp < timestamp){
                setAuthToken()
                this.logout() 
            }else if(iat < exp){
                setAuthToken(token)
                this.login()  
            }
        }
        return this.authenticated;
    }
    getToken(){
        //Existe un token?
        if(localStorage.userToken){
            return true
        }else{
            return false
        }
    }
    getProfile(){
        const token = localStorage.userToken
        const perfil = jwt.decode(token)
        return perfil
    }
}
export default new Auth();
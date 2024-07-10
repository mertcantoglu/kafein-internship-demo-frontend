/**
 * A helper class that manages the session data such as setting, deleting, getting user data or getting logged in state.
 */
class SessionHelper {
    user = null;
    isLoggedIn = false;
    loginTime = null; 

    constructor() {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            this.user = JSON.parse(userInfo);
            this.isLoggedIn = true;
            this.loginTime = new Date();
        }
    }


    setUser(user) {
        this.user = user;
        this.isLoggedIn = true;
        this.loginTime = new Date();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loginTime', this.loginTime);
    }


    deleteUser() {
        localStorage.removeItem('user');
        this.user = null;
        this.isLoggedIn = false;
        this.loginTime = null;
    }


    getUser() {
        return this.user;
    }


    getIsLoggedIn() {
        return this.isLoggedIn;
    }

    getLoginTime() {
        return localStorage.getItem("loginTime");
    }

    setLoginTime() {
        this.loginTime = new Date();
        localStorage.setItem('loginTime', this.loginTime);
    }
}

export default new SessionHelper();
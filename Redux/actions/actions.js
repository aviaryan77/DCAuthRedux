export function setLoggedInStatus (status) {
    console.warn("status", status)
    const x = {
        type: "SET_LOGGED_IN_STATUS",
        payload: {
            status
        }
    }
    return x;
}
export function setUserName (userName) {
    
    console.warn("userName", userName)
    return {
        type: "SET_USERNAME",
        payload: {
            userName
        }
    }
}

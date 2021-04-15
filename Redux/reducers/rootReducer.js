import { combineReducers } from "redux";

const initialState = {
    isLoggedIn: false,
    userName: ""
}


const reducer = (state=initialState, action) => {
        switch(action.type) {
        case "SET_LOGGED_IN_STATUS": return {
            ...state,
            isLoggedIn: action.payload.status
        }
        case "SET_USERNAME": return {
            ...state,
            userName: action.payload.userName
        }
        default: return state; 
    }
    
}

const rootReducer = combineReducers({
   user: reducer
});

export default rootReducer;

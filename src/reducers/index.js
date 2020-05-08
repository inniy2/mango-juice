//import counterReducer from './counter'
//import loggedReducer from './isLogged'
import { combineReducers } from 'redux';

const counterReducer = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + action.payload;
        case 'DECREMENT':
            return state - action.payload;
        default :
            return 0
    };
};


const loginReducer = ( state = { 'isLogged': false, 'user_name': ''}, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {
                'isLogged': !state.isLogged,
                'user_name': action.payload
            }
        case 'SIGN_OUT':
            return {
                'isLogged': false,
                'user_name': ''
            }
        default:
            return {
                'isLogged': false,
                'user_name': ''
            }
    };
};



const rootReducer = combineReducers({
    counterReducer,
    loginReducer,

});

export default rootReducer;


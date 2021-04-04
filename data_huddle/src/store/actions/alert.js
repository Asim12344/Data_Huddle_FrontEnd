import * as actionTypes from './actionTypes'

export const showAlert = (message,variant) => {
    return{
        type: actionTypes.showAlert,
        message: message,
        variant: variant
    };
};

export const hideAlert = () => { 
    return (dispatch) => {
        setTimeout(() => {
            dispatch({type: actionTypes.hideAlert})
        },3000);
    }
   
};

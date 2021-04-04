import * as actionTypes from '../actions/actionTypes';

const initialState = {
    alert: false,
    alertMessage: "",
    alertType: ""
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.showAlert:
            return {
                ...state,
                alert: true,
                alertMessage: action.message,
                alertType: action.variant
            }
        case actionTypes.hideAlert:           
            return {
                ...state,
                alert: false,
                alertMessage: "",
                alertType: ""
            }
    }
    return state;
};

export default reducer;
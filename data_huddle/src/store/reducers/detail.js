import * as actionTypes from '../actions/actionTypes';

const initialState = {
    detail: [],
    stockRecords:[],
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.data:
            return{
                ...state,
                stockRecords: action.data
            }
        
    }
    return state;
}

export default reducer;
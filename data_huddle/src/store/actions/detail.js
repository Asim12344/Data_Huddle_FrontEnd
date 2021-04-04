import * as actionTypes from './actionTypes'

export const data = (data) => {
    return{
        type: actionTypes.data,
        data:data
    };
};
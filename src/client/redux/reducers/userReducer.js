// src/reducers/userReducer.js

import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILURE
} from '../actions/userActions';

const initialState = {
    loading: false,
    userData: {},
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                userData: action.payload,
                error: null,
            };
        case USER_SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;

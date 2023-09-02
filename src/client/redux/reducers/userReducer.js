import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE, USER_LOGOUT,
} from '../actions/userActions';

const initialState = {
    user: {
        username: '',
        password: ''
    },
    loading: false,
    error: null,
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Login Actions
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Signup Actions
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
        case USER_LOGOUT:
            return {
                ...initialState
            };


        default:
            return state;
    }
};


export default userReducer;

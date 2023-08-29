// src/actions/userActions.js

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';

export const userSignUpRequest = () => ({
    type: USER_SIGNUP_REQUEST,
});

export const userSignUpSuccess = (userData) => ({
    type: USER_SIGNUP_SUCCESS,
    payload: userData,
});

export const userSignUpFailure = (error) => ({
    type: USER_SIGNUP_FAILURE,
    payload: error,
});

export const signupUser = (userData) => {
    return async (dispatch) => {
        dispatch(userSignUpRequest(userData));
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            dispatch(userSignUpSuccess(data));
        } catch (error) {
            dispatch(userSignUpFailure(error.message));
        }
    };
};

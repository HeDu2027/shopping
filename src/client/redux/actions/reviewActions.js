export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const SET_USER_ACTIONS = 'SET_USER_ACTIONS';

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
});

export const updateComments = (comments) => ({
    type: UPDATE_COMMENTS,
    payload: comments
});

export const setUserActions = (userActions) => ({
    type: SET_USER_ACTIONS,
    payload: userActions
});

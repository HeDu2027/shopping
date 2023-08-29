import { ADD_COMMENT, UPDATE_COMMENTS, SET_USER_ACTIONS } from '../actions/reviewActions';

const initialState = {
    comments: [],
    userActions: {}
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                comments: action.payload
            };
        case SET_USER_ACTIONS:
            return {
                ...state,
                userActions: action.payload
            };
        default:
            return state;
    }
};

export default reviewReducer;

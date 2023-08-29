// src/reducers/index.js

import { combineReducers } from 'redux';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer';

export default combineReducers({
    reviews: reviewReducer,
    user: userReducer
});

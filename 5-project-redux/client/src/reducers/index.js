import { combineReducers } from 'redux';
import books from './books_reducer';
import user from './user_reducer';
// import artists from './artist_reducer';

const rootReducer = combineReducers({
    // artists
    user,
    books
})

export default rootReducer;

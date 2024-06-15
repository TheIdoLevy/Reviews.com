import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import searchSlice from './features/searchSlice';
import reviewsSlice from './features/reviewsSlice';

const store = configureStore({
    preloadedState: {
        isLoggedIn: false, 
        reviews: [], 
        credentials: {username: null, gmail: null, origin: null},
        history: {viewed: [], liked: [], lastSeen: null},
        reviewsBySubject: [],
        reviewSearchValue: '',
    },
    reducer: {
        user: userSlice,
        searchValue: searchSlice,
        review: reviewsSlice,
    }
});

export default store;
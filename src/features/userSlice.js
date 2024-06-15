import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    isLoggedIn: false, 
    reviews: [], 
    credentials: {username: null, gmail: null, profileImg: null},
    history: {reviews: [], liked: 0, likes: 0},
    loginError: false
};

const options = {
    name: 'user',
    initialState,
    reducers: {
        toggleLoggedIn: (state = initialState, action) => {
            return {...state, isLoggedIn: action.payload};
        },
        addReview: (state = initialState, action) => {
            const userReviews = [];
            action.payload.forEach(r => userReviews.push(r));
            state.reviews.forEach(r => userReviews.push(r));
            return {...state, reviews: userReviews};
        },
        changeCredentials: (state = initialState, action) => {
            let newCredentials = {username: action.payload.username, gmail: action.payload.gmail, profileImg: action.payload.img};
            return {...state, credentials: newCredentials};
        },
        editHistory: (state = initialState, action) => {
            return {...state, history: {
                reviews: action.payload.reviews,
                liked:  state.history.liked + action.payload.liked,
                likes:  state.history.likes + action.payload.likes,
            }};
        },
        toggleLoginError: (state = initialState, action) => {
            return {...state, loginError: action.payload}
        },
        resetReviews: (state = initialState, action) => {
            return {...state, reviews: []};
        },
        resetState: (state=initialState, action) => {
            return {  
                ...state,  
                isLoggedIn: false, 
                reviews: [], 
                credentials: {username: null, gmail: null, origin: null},
                history: {viewed: [], liked: [], lastSeen: null},
                loginError: false
            };
        }
    }
};

const userSlice = createSlice(options);

export const getLoggedIn = state => state.user.isLoggedIn;
export const getReviews = state => state.user.reviews;
export const getCredentials = state => state.user.credentials;
export const getUserHistory = state => state.user.history;
export const getLoginError = state => state.user.loginError;

export const toggleLoggedIn = bool => {return {type: 'user/toggleLoggedIn', payload: bool}};
export const addReview = reviews => {return {type: 'user/addReview', payload: reviews}};
export const changeCredentials = credentials => {return {type: 'user/changeCredentials', payload: credentials}};
export const editUserHistory = event => {return {type: "user/editHistory", payload: event}};
export const toggleLoginError = p => {return {type: "user/toggleLoginError", payload: p}};
export const resetReviews = () => {return {type: "user/resetReviews", payload: null}};
export const logoutReset = () => {return {type: "user/resetState", payload: null} };

export default userSlice.reducer;
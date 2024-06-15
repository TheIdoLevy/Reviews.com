import { createSlice } from "@reduxjs/toolkit";

const initialState = {reviewsBySubject: [], searchSubject: '', viewing: {}, reviewSearchValue: ''};
const options = {
    name: 'review',
    initialState,
    reducers: {
        addReviews: (state=initialState, action) => {
            return {...state, reviewsBySubject: action.payload};
        },
        changeSearchSubject: (state=initialState, action) => {
            return {...state, searchSubject: action.payload};
        },
        changeReviewSearchValue: (state=initialState, action) => {
            return {...state, reviewSearchValue: action.payload}
        },
        clearReviews: (state=initialState, action) => {
            return {...state, reviewsBySubject: []};
        },
        changeViewing: (state=initialState, action) => {
            return {...state, viewing: action.payload}
        }
    },
};
const reviewsSlice = createSlice(options);


export const addReview = value => { return {type: 'review/addReviews', payload: value} };
export const changeReviewSubject = value => { return {type: 'review/changeSearchSubject', payload: value} };
export const clearAllReviews = () => {return {type: 'review/clearReviews', payload: null } };
export const changeCurrentViewing = value => {return {type: 'review/changeViewing', payload: value } };
export const changeReviewSearch = value => {return {type: 'review/changeReviewSearchValue', payload: value } };


export const selectReviews = state => state.review.reviewsBySubject;
export const selectReviewSearchValue = state => state.review.searchSubject;
export const selectCurrentViewing = state => state.review.viewing;
export const selectReviewSearch = state => state.review.reviewSearchValue;

export default reviewsSlice.reducer;
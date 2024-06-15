import { createSlice } from "@reduxjs/toolkit";

const initialState = {searchValue: ''};
const options = {
    name: 'searchValue',
    initialState,
    reducers: {
        editSearchValue: (state=initialState, action) => {
            return {...state, searchValue: action.payload}
        },
        clearSearchValue: (state=initialState, action) => {
            return {...state, searchValue: ''}
        }
    }
};
const searchValueSlice = createSlice(options);


export const editSearchValue = value => { return {type: 'searchValue/editSearchValue', payload: value} };
export const clearSearchValue = () => { return {type: 'searchValue/clearSearchValue'} };

export const selectSearchValue = state => state.searchValue.searchValue;

export default searchValueSlice.reducer;
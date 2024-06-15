import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeReviewSubject } from "../features/reviewsSlice";

export default function SearchBar(){
        const dispatch = useDispatch();
        const navigate = useNavigate();
        return(
            <div>
                <input type="text" placeholder="Type a subject" style={
                    {borderRadius: '14% splid', backgroundColor: 'black', border:'1px solid white', marginTop: 10, width: '50%', height: 30, marginLeft: '25%', color: 'white'}
                    } 
                    onChange={({target})=>{dispatch(changeReviewSubject(target.value))}}
                />
                <button onClick={()=>{navigate("/main")}}>Search</button>
            </div>
        )
};
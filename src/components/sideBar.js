import { useDispatch } from 'react-redux';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { getReviewsBySubject, getReviewByTitle } from "../api/reviews";
import { addReview, clearAllReviews, changeReviewSubject } from "../features/reviewsSlice";


export default function SideBar(){
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchByX, setSearchByX] = useState('subject');



    function handleSideBar(value){
        if(searchByX === 'subject'){
            getReviewsBySubject(value)
            .then(res => {
                if(res.length > 0) dispatch(addReview(res))
                else dispatch(clearAllReviews);
            });
        } else {
            getReviewByTitle(value)
            .then(res => {
                if(!res.err) dispatch(addReview(res.res))
                else dispatch(clearAllReviews);
            });
        };
    };
    
    return(
            <div id="sideBarMain">
                <h3>Reviews.com</h3>
                <input type="text" placeholder="Type in a topic or a name" id="sideBarInput" onChange={({target})=>{setSearchValue(target.value)}}/>
                <button onClick={()=>{
                    dispatch(changeReviewSubject(searchValue));
                    handleSideBar(searchValue);
                }}>Search</button>
                <div id="sOt">
                    <label for="s">Subject</label>
                    <input type="radio" value="Search By subject" id="s" name="sT" onClick={()=>{setSearchByX('subject')}}/>
                    <br/>
                    <label for="t">Title</label>
                    <input type="radio" value="Search By title" id="t" name="sT" onClick={()=>{setSearchByX('title')}}/>
                </div>
                <div id="sideBarNav">
                    <h4 onClick={()=>{handleSideBar('Hotels')}}>Hotels</h4>
                    <h4 onClick={()=>{handleSideBar('Restaurants')}}>Restaurants</h4>
                    <h4 onClick={()=>{handleSideBar('Sports')}}>Sports</h4>
                    <h4 onClick={()=>{handleSideBar('Tech')}}>Tech</h4>
                    <h4><Link to="/" style={{textDecoration:'none', color:'aliceblue'}}>Home</Link></h4>
                    <h4><Link to="/profile" style={{textDecoration:'none', color:'aliceblue'}}>My profile</Link></h4>
                    <h4><Link to="/create" style={{textDecoration:'none', color:'aliceblue'}}>Review something</Link></h4>
                </div>
            </div>
    )
};
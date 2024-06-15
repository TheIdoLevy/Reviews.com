import { createPost } from "../api/reviews";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCredentials, getLoggedIn, addReview } from "../features/userSlice";
import { Link } from "react-router-dom";
import Msg from "../components/msg";

export default function CreateReview(){
    const dispatch = useDispatch();
    const [title, setTitle] = useState(null);
    const [img, setImg] = useState(null);
    const [rating, setRating] = useState(null);
    const [content, setContent] = useState(null);
    const [subject, setSubject] = useState(null);
    const [other, setOther] = useState(false);
    const [err, setErr] = useState(false);
    const [done, setDone] = useState(false);
    const {username} = useSelector(getCredentials);
    const loggedIn = useSelector(getLoggedIn);

    function handleSubmit(){
        if(rating > 10 || rating < 0){
            alert("Please enter a valid rating.");
            return;
        };
        createPost(title, username, img, rating, content, subject)
        .then(r => r.json())
        .then(res => {
            if(res.err){
                console.log("error");
                setErr(true);
                setDone(false);
            } else {
                setErr(false);
                // dispatch(addReview([{title,img,rating,content,subject,username}]));
                setDone(true);
            }
        });

    }

    function handleOther(v){
        console.log(v);
        if(other==='Other')setOther(true);
    }

        return(
            <div>
                { loggedIn && 
                    <div id="createReviewBG">
                        <div id="createReviewMain">
                            <div id="cRH">
                                <Link to="/" id="createReviewBack">Back</Link>
                                <h1 id="createReviewHeader">Create a review</h1>
                            </div>
                            <div id="createReviewSquare">
                                <h3>Review Title: </h3>
                                <input type="text" placeholder="Enter your review's title" onChange={({target})=>{setTitle(target.value); /*console.log(a.value)*/}} id="revTI"/>
                                <h3>Review Subject: </h3>
                                {/* <input type="text" onChange={({target})=>{setSubject(target.value)}}/> */}
                                <select onChange={({target})=>{setSubject(target.value); handleOther('target.value')}} id="oSelect">
                                    <option value="Tech">Tech</option>
                                    <option value="Hotels">Hotels</option>
                                    <option value="Food">Food</option>
                                    <option value="Restaurants">Restaurants</option>
                                    <option value="Attractions">Attractions</option>
                                    <option value="Landmarks">Landmarks</option>
                                    <option value="Parks">Parks</option>
                                    <option value="AI">AI</option>
                                    <option value="Apps">Apps</option>
                                    <option value="Books">Books</option>
                                    <option value="Movies">Movies</option>
                                    <option value="Series">Series</option>
                                    <option value="Companies">Companies</option>
                                    <option value="Cities">Cities</option>
                                    <option value="Shops">Shops</option>
                                    <option value="Vehicles">Vehicles</option>
                                    <option value="People">People</option>
                                    <option value="Music">Music</option>
                                    <option value="Schools">Schools</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Trips">Trips</option>
                                    <option value="Other" >Other</option>
                                </select>
                                {  other && 
                                    <input type="text" placeholder="Please enter the subject of your review" onChange={({target})=>{setSubject(target.value)}}/>
                                }
                                <h3>Add an image link (Optional): </h3>
                                <input type="text" placeholder="Enter a link to an image that realtes to your review" onChange={({target})=>{setImg(target.value)}}/>
                                <h3>Your rating from 1 to 10: </h3>
                                <input type="number" min={1} max={10} onChange={({target})=>{setRating(target.value)}}/>
                                <h3>Your review</h3>
                                <textarea rows={4} cols={40} onChange={({target})=>{setContent(target.value)}}/>
                                <button onClick={()=>{handleSubmit()}}>Submit</button>
                            </div>
                        </div>
                    </div>
                }
                { !loggedIn &&
                    <div>
                        <h1 style={{color:"white", marginTop: 100}}>Please <Link to='/signin' style={{color:'yellowgreen'}}>login</Link> first.</h1>
                        <img src="https://img.freepik.com/free-vector/astronaut-spacesuit-icon-vector-design-illustration_460848-6981.jpg?t=st=1689581930~exp=1689582530~hmac=b662791c40bedebfc31891ffa895cea6462265a15d3ccaf960ef4a265a14f459"/>
                    </div>
                }
                { err &&
                    <Msg hide={false} err={true}/>
                }
                { done &&
                    <Msg hide={false} err={false}/>
                }
            </div>
        )
}
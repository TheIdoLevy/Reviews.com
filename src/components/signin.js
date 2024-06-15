import React from "react";
import { Link } from "react-router-dom";
import { login, getReviewsByUserId } from "../api/reviews";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { changeCredentials, toggleLoggedIn} from "../features/userSlice";
import { addReview } from '../features/userSlice';
import { useNavigate } from "react-router-dom";


export default function Signin(){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLoginSubmit(username, password){
        try{
            login(username, password)
            .then(user => {
                if(user.user){
                    const gmail = user.user.email;
                    const profileImg = user.user.profile_image;
                    dispatch(changeCredentials({username, gmail, profileImg}));
                    dispatch(toggleLoggedIn(true));
                    getReviewsByUserId()
                    .then(res => res.json())
                    .then(j => {dispatch(addReview(j)); console.log(j)})
                    navigate('/');
                }
            })
        } catch(err) {
            console.log(err);
        }
    };


    return(
            <div>
                <div id="signinMain">
                    <Link style={{textDecoration:'none'}} to='/'><h2 style={{color:'wheat', marginBottom: 0, marginLeft: 10, width:'10%', position: 'fixed'}} id="signinBack">Back</h2></Link>
                    <h1 id="signinHeader">Sign in to your accout</h1>
                    <div id="signinGrid">
                        <div className="singinInput">
                            <h4>Username:</h4>
                            <input type="text" onChange={({target})=>{setUsername(target.value)}}/>
                        </div>
                        <div className="singinInput">
                            <h4>Password:</h4>
                            <input type="password" onChange={({target})=>{setPassword(target.value)}}/>
                        </div>
                        <div className="signinButton">
                            <button onClick={()=>{handleLoginSubmit(username, password)}}>Sign in</button>
                        </div>
                        {/* <div className="singinThirdParty">
                            Sign in with <span style={{color:'blue'}}>G</span><span style={{color:'red'}}>o</span><span style={{color:'goldenrod'}}>o</span><span style={{color:'blue'}}>g</span><span style={{color:'green'}}>l</span><span style={{color:'red'}}>e</span>
                        </div>
                        <div className="singinThirdParty">
                            Sign in with <span style={{color: 'blue'}}>Facebook</span>
                        </div> */}
                        <div className="defaultSignin">
                            Don't have an account? <Link to='../signup'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
     )
}
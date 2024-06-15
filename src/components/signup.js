import { useState } from "react";
import { registerUser } from "../api/reviews";
import { Link, useNavigate } from "react-router-dom";
import {changeCredentials, toggleLoggedIn} from "../features/userSlice";
import { useDispatch } from "react-redux";
import Msg from "./msg";
import validator from "validator";

export default function Signup(){
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState('');
        const [err, setErr] = useState('');

        function handleRegister(){
            if(username.length < 6 || password.length < 6){
                setErr(true);
                return;
            }
            if(validator.escape(password)!==password || validator.escape(username)!==username){
                setErr(true);
                return;        
            };
            if(!validator.isEmail(email)){
                setErr(true);
                return;
            };
            registerUser({username, password, email})
            .then(res => {
                    console.log(res);
                    if(!res.err){
                        dispatch(changeCredentials({username, email, img: null}));
                        dispatch(toggleLoggedIn(true));
                        navigate('/');
                    } else {
                        setErr(true);
                    }
            });
        }

        return(
            <div>
                <div id="signinMain">
                    <Link style={{textDecoration:'none'}} to='/'><h2 style={{position: 'fixed', color:'wheat', marginBottom: 0, marginLeft: 10, width:'10%', padding: 0}} id="signinBack">Back</h2></Link>
                    <h1 id="signinHeader">Create an account</h1>
                    <div id="signinGrid">
                        <div className="singinInput">
                            <h4>Username:</h4>
                            <input type="text" onChange={({target})=>{setUsername(target.value)}}/>
                        </div>
                        <div className="singinInput">
                            <h4>Password:</h4>
                            <input type="text" onChange={({target})=>{setPassword(target.value)}}/>
                        </div>
                        <div className="singinInput">
                            <h4>Email:</h4>
                            <input type="text" onChange={({target})=>{setEmail(target.value)}}/>
                        </div>
                        <div className="signinButton">
                            <button onClick={handleRegister}>Create account</button>
                        </div>
                        {/* <div className="singinThirdParty">
                            Sign up with <span style={{color:'blue'}}>G</span><span style={{color:'red'}}>o</span><span style={{color:'goldenrod'}}>o</span><span style={{color:'blue'}}>g</span><span style={{color:'green'}}>l</span><span style={{color:'red'}}>e</span>
                        </div>
                        <div className="singinThirdParty">
                            Sign up with <span style={{color: 'blue'}}>Facebook</span>
                        </div> */}
                    </div>
                </div>
                {  err &&
                    <div id="signUpErr">
                        <h3 onClick={()=>{setErr(false)}} id="signUpX">X</h3>
                        <Msg signUpErr={true}/>
                    </div>
                }
            </div>
        )
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Msg(props){
    const [hide, setHide] = useState(props.hide);
    const navigate = useNavigate();
    return(
        <div id="msgMain" style={{display: hide ? 'none' : 'flex'}}>
            { !props.signUpErr &&
                <h3 id="msgX" onClick={()=>{
                    if(props.err) setHide(true)
                    else {
                        setHide(true);
                        navigate("/main");
                    };
                }}>X</h3>
            }
            {
                props.err && (
                    <div>
                        <h3 id="msgH3">There was an error. Please try again.</h3>
                    </div>
                )
            }
            {
                (!props.err && !props.signUpErr) && (
                    <div>
                        <h3 id="msgH3">Successfully posted your review!</h3>
                    </div>
                )
            }
            {
                props.signUpErr && (
                    <div id="signUpErrMain">
                        <h3>There was an error with your credentials.</h3>
                        <h3>Your password and username <strong>must</strong> include at least 6 characters</h3>
                        <h3>Your password and username cannot include the following characters: {`>`}, {`<`}, &, ', ", and /</h3>
                        <h3>You must enter a valid email address</h3>
                        <h3>If you followed these rules and an error is still showing up, try a different username and password</h3>
                    </div>
                )
            }
        </div>
    )
 }
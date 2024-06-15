import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';
import { getLoggedIn, getCredentials, logoutReset, toggleLoggedIn, resetReviews } from "../features/userSlice";
import { logout } from "../api/reviews";
import { useDispatch } from "react-redux";


export default function NavBar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let loggedIn = useSelector(getLoggedIn);
    let credentials = useSelector(getCredentials);


    return(
        <div id="navBarMain">
            <h4 id="navBarLogo">Reviews.com</h4>
            {   !loggedIn && 
                    <div>
                        <Link to="/signin" style={{textDecoration:'none', color: "white"}}><h4>Sign in</h4></Link>
                    </div>
            }
            {   !loggedIn && 
                        <Link to="/signup" style={{textDecoration:'none', color: "white"}}><h4>Sign up</h4></Link>
            }
            {   loggedIn && 
                    <div>
                        <Link to="#" style={{textDecoration:'none', color: "white"}}><h4>{credentials.username}</h4></Link>
                    </div>
            }
            {   loggedIn && 
                    <div>
                        <Link to="#" style={{textDecoration:'none', color: "white"}} onClick={()=>{
                            logout().then(res => {
                                console.log(res);
                                alert("Are you sure you want to leave?");
                                dispatch(resetReviews);
                                dispatch(logoutReset);
                                dispatch(toggleLoggedIn(false));
                                alert(res.err ? res.msg : "Successfully logged out");
                                navigate('/');
                            })
                        }}><h4>Logout</h4></Link>
                    </div>
            }
            {   loggedIn && 
                    <div>
                        <Link to="/profile" style={{textDecoration:'none', color: "white"}}><h4>My Profile</h4></Link>
                    </div>
            }
                <Link to="/create" style={{textDecoration:'none', color: "white"}}><h4>Review something</h4></Link>
                <Link to="/" style={{textDecoration:'none', color: "white"}}><h4>Home</h4></Link>
                <Outlet/>
        </div>
    )
}
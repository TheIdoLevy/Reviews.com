import NavBar from '../components/navbar';
import Review from '../components/review';
import { useSelector } from 'react-redux';
import { getCredentials, getUserHistory, getLoggedIn } from '../features/userSlice';
import { getReviews } from '../features/userSlice';

export default function ProfilePage(){
    const loggedIn = useSelector(getLoggedIn);
    const user = useSelector(getCredentials);
    const history = useSelector(getUserHistory);
    const reviews = useSelector(getReviews);

    return(
        <div id="profilePageMain" style={{color:'white'}}>
            <NavBar/>
            { loggedIn &&
            <div>
                <header>
                    <h1>My profile</h1>
                </header>
                <div id="profileInfo">
                    <h2 id="profileUsername">{user.username}</h2>
                    <h2 id="profileGmail">{user.gmail}</h2>
                </div>
                <div id="profileInfo">
                    <h2>Info: </h2>
                    <h2>Liked: {history.liked}</h2>
                    <h2>Likes: {history.likes}</h2>
                </div>
                <div id='userReviews'>
     
                    {
                        reviews.map(r => 
                            <Review title={r.title} author={r.author} img={r.img} id={r.id} profile={true}/>
                        )
                    }
                </div>
            </div>
            }
            {   !loggedIn &&
                <h1>Please login!</h1>
            }
        </div>
    )
};
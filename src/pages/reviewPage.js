import { useSelector } from "react-redux";
import { selectCurrentViewing } from "../features/reviewsSlice";
import { useNavigate } from "react-router-dom";


export default function ReviewPage(){
    const cR = useSelector(selectCurrentViewing);
    const navigate = useNavigate()
    return(
        <div style={{color:'white'}} id="reviewPageMain">
            <button onClick={()=>{navigate('/main')}}>Back</button>
            <div id="reviewPageHeader">
                <h1>{cR.title}</h1>
            </div>
            <div id="reviewPageInfo">
                <h4>Published by{cR.author}</h4>
                <h6>Published on {cR.date}, {cR.time}</h6>
            </div>
            <img src={cR.img} id="reviewPageImg"/>
            <main id="reviewPageMainSection">
                <h3>Rating: {cR.rating}</h3>
                <h3>Review:</h3>
                <h4>{cR.content}</h4>
            </main>
        </div>
    )
}
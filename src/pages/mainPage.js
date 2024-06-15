import React from "react";
import SideBar from "../components/sideBar";
import Review from "../components/review";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReviewsBySubject, getReviewByTitle } from "../api/reviews";
import { selectReviews, addReview, selectReviewSearchValue, clearAllReviews, selectReviewSearch} from "../features/reviewsSlice";



export default function MainPage(){
        const dispatch = useDispatch();
        const [results, setResults] = useState(0);
        let searchValue = useSelector(selectReviewSearchValue);
        let reviews = useSelector(selectReviews);

        useEffect(()=>{
            getReviewsBySubject(searchValue)
            .then(res => {
                if(res.length > 0){
                    dispatch(addReview(res));
                    setResults(res[-1])
                    console.log(res[-1])
                };
            });
        }, [searchValue]);

        return(
            <div id="mainPageMain">
                <h1 id="mainPageHeader">Search for a review or review <br/> something yourself.</h1>
                {   results &&
                    <h2 style={{color:'white', position: 'fixed', zIndex:'100'}}>Total results: {results}</h2>
                }
                <SideBar/>
                <div id="reviewsMain">
                    <div id="reviews">
                        {
                            Array.isArray(reviews) &&
                            reviews.map(r => 
                                <Review title={r.title} author={r.author} img={r.img} rating={r.rating} content={r.content} time={r.time} date={r.date}/>
                            )
                        }
                    </div>
                </div>
            </div>
        )
};
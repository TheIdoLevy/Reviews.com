import React from "react";
import NavBar from "../components/navbar";
import SearchBar from "../components/searchbar";
import { Link } from "react-router-dom";

export default function HomePage(){
        return(
            <div id="homePageMain">
                <NavBar/>
                <SearchBar/>
                <img src="https://media0.giphy.com/media/U3qYN8S0j3bpK/giphy.gif?cid=ecf05e47ze9netqov8gyaoavo2bbqs5pg7eyfi2w0bbil4su&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="loading" id="homepageImg"/>
                <h1 style={{color:'wheat'}}>Welcome!</h1>
                <h5 style={{fontSize: 17}}>Reviews.com is a website that allows people all over the world to <br/> share their thought about anything that you can think of. No more <br/> searching throught the whole internet to find a review about something. <br/> Reviews.com has got you covered</h5>
                <br/><br/><br/><br/><br/>
                <Link to="/main"><button id="getStartedButton">Get Started!</button></Link>
            </div>
        );
};
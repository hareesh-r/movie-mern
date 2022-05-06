import React, { useEffect } from 'react'
import { useState, useContext } from "react";
import './App.css'
import { UserContext } from "./App";
import Axios from 'axios'
import star from './assets/img/star.png'
function Movie() {
    const { CurrentUser, setCurrentUser } = useContext(UserContext);
    const { CurrentMovie, setCurrentMovie } = useContext(UserContext);
    const [userRatings, setUserRatings] = useState(["No Ratings Yet"]);
    const [userRating, setUserRating] = useState(["No Ratings Yet"]);
    const [isRated, setIsRated] = useState(false);
    const [Review,setReview] = useState("");
    const [Rating,setRating] = useState(0);
    let userrating = 0;
    const getUserReviews = () => {
        Axios.get(`http://localhost:3001/userReviews`, {
            params: {
                movieid: CurrentMovie?.movieid
            }
        }).then((response) => {
            setUserRatings(response.data);

            for (let i = 0; i < response.data.length; i++) {
                userrating += response.data[i].rating;
            }

            setUserRating(userrating/response.data.length);
        });
    }
    const addReview = () => {
        console.log(CurrentMovie?.movieid,
            CurrentUser?.username,
            Review,
            Rating)
        Axios.post(`http://localhost:3001/addReview`, {
            movieid: CurrentMovie?.movieid,
            username: CurrentUser?.username,
            review: Review,
            rating: Rating
        }).then(() => {
            alert("Review Added Successfully");
        });
    }
    const calculateUserRating = (currentRating) => {
        let rating = currentRating;
        let count = 1;
        for (let i = 0; i < userRatings.length; i++) {
            rating += userRatings[i].rating;
            count++;
        }
        return rating / count;
    }
    const getStarRating = (rating) => {
        let lrating = [];
        let lnorating = [];
        var count = 0;
        for (let i = 0; i < rating; i++) {
            lrating.push(star);
            count++;
        }
        for (let i = 5 - count; i > 0; i--) {
            lnorating.push(star);
        }
        return [...lrating];
    }
    let rating = [];
    let norating = [];
    var count = 0;
    for (let i = 0; i < CurrentMovie?.masterrating; i++) {
        rating.push(star);
        count++;
    }
    for (let i = 5 - count; i > 0; i--) {
        norating.push(star);
    }

    return (
        <div className='Movie flex col'>
            <div className="top movie-top flex row">
                <div className='flex col left'>
                    <div className='movie-logo-container'>
                        <img className="movie-logo-banner" src={CurrentMovie?.movielogo} alt="" />
                    </div>
                </div>

                <div className="movie-details">
                    <h1>{CurrentMovie?.moviename}</h1>
                    <br />
                    <div className="flex row"><h3><strong>Synopsis : </strong>{CurrentMovie?.synopsis}</h3></div>
                    <br />
                    <div className="flex row">
                        <h3><strong>Cast & Crew : </strong>{CurrentMovie?.cast}</h3></div>

                </div>
            </div>
            <div className="ratings-block flex row">
                <div className="whole-rating-master flex row">
                    <h2>Master Rating : </h2>
                    <div className="rating">{
                        rating.map((star, index) => (
                            <img key={index} src={star} alt="" />
                        ))
                    }
                    </div>
                    <div className="norating">{
                        norating.map((star, index) => (
                            <img key={index} src={star} alt="" />
                        ))
                    }
                    </div>
                    <h3>
                        ({CurrentMovie?.masterrating}/5)
                    </h3>

                </div>
                <div className="whole-rating-user flex row">
                    <h2>User Rating : </h2>
                    <div className="rating">{
                        getStarRating(Math.floor(userRating)).map((star, index) => (
                            <img key={index} src={star} alt="" />
                        ))
                    }
                    </div>
                    <div className="norating">{
                        getStarRating(Math.ceil(5-userRating)).map((star, index) => (
                            <img key={index} src={star} alt="" />
                        ))
                    }
                    </div>
                    <h3>
                        ({userRating}/5)
                    </h3>
                </div>
            </div>

            <div className="master-review movie-logo-container">
                <h1>Master Review</h1>
                <br />
                <h2>
                    {CurrentMovie?.masterreview}
                </h2>
            </div>

            <div className="master-review movie-logo-container">
                <h1 onClick={() => { setIsRated(!isRated); getUserReviews() }} className='pointer'>{!isRated ? "Show User Reviews" : "Hide User Reviews"}</h1><br />{
                    isRated &&
                    <h2>
                        {userRatings.map((review, index) => (
                            <div key={index} className="user-review flex col right">
                                <div className='flex left row'>
                                    <div className="user-image flex center">
                                        {review?.username?.slice(0, 1).toUpperCase()}
                                    </div>
                                    <h3>{review?.username}</h3> -
                                    <h4 className='lite'>{review?.userreview}</h4>
                                </div>
                                <div className="fb whole-rating-user flex row">
                                        <div className="rating row">{
                                            getStarRating(review?.rating).map((star, index) => (
                                                <img key={index} src={star} alt="" />
                                            ))
                                        }
                                        </div>
                                        <div className="fb norating row">{
                                            getStarRating(5 - review?.rating).map((star, index) => (
                                                <img key={index} src={star} alt="" />
                                            ))
                                        }
                                        </div> <h3>
                                            ({review?.rating}/5)
                                        </h3>
                                    </div>
                            </div>
                        ))}
                    </h2>
                }

            </div>
            <div className="write-review movie-logo-container flex col left">
                <h1>Write a Review</h1>
                <textarea onChange={(e)=>setReview(e.target.value)} class="textarea" placeholder='Write your review here'></textarea>
                <input onChange={(e)=>setRating((e.target.value))} placeholder='Enter your rating ( 0 - 5 )' type="number" max={5} />
                <button onClick={()=>{
                    setUserRatings([...userRatings,{userreview:Review,rating:Rating,username:CurrentUser.username}]);
                    let finalRating = calculateUserRating(parseInt(Rating));
                    setUserRating(finalRating);
                    console.log(finalRating)
                    addReview();
                }} className='pointer'>Post</button>
            </div>
        </div>
    )
}

export default Movie
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import { Link } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import logo from './assets/img/placeholder.jpg'
function Dashboard() {
  const { CurrentUser, setCurrentUser } = useContext(UserContext);
  const { CurrentMovie, setCurrentMovie } = useContext(UserContext);
  const [movieList, setMovieList] = useState([
    {
      "movieid": 1,
      "moviename": "Dr Strange Multiverse of Madness",
      "movielogo": "https://assets-prd.ignimgs.com/2022/02/14/doctor-strange-in-the-multiverse-of-madness-button-1644855515935.jpg",
      "genre": "fiction",
      "synopsis": "Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle.",
      "cast": "Benedict Cumberbatch as Dr. Stephen Strange | Elizabeth Olsen as Wanda Maximoff / Scarlet Witch | Chiwetel Ejiofor as Karl Mordo | Benedict Wong as Wong | Xochitl Gomez as America Chavez | Michael Stuhlbarg as Nicodemus West | Rachel McAdams as Christine Palmer",
      "masterreview": "In Marvel Studios' \"Doctor Strange in the Multiverse of Madness,\" the MCU unlocks the Multiverse and pushes its boundaries further than ever before. Journey into the unknown with Doctor Strange, who, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.",
      "masterrating": 4
    }, {
      "movieid": 1,
      "moviename": "Dr Strange Multiverse of Madness",
      "movielogo": "https://assets-prd.ignimgs.com/2022/02/14/doctor-strange-in-the-multiverse-of-madness-button-1644855515935.jpg",
      "genre": "fiction",
      "synopsis": "Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle.",
      "cast": "Benedict Cumberbatch as Dr. Stephen Strange | Elizabeth Olsen as Wanda Maximoff / Scarlet Witch | Chiwetel Ejiofor as Karl Mordo | Benedict Wong as Wong | Xochitl Gomez as America Chavez | Michael Stuhlbarg as Nicodemus West | Rachel McAdams as Christine Palmer",
      "masterreview": "In Marvel Studios' \"Doctor Strange in the Multiverse of Madness,\" the MCU unlocks the Multiverse and pushes its boundaries further than ever before. Journey into the unknown with Doctor Strange, who, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.",
      "masterrating": 4
    }
  ]);
  const getMovie = (index) => {
    Axios.get(`http://localhost:3001/getMovieByID`, {
      params: {
        movieid: index
      },
    }).then((response) => {
      setCurrentMovie(response.data[0]);
    });
  }
  const [genre, setGenre] = useState('');
  const [genreList, setgenreList] = useState(['fiction', 'action', 'comedy', 'drama', 'horror', 'romance', 'thriller', 'All']);
  useEffect(() => {
    Axios.get(
      `http://localhost:3001/Movies`
    ).then((response) => {
      setMovieList(response.data);
    });
  }, [])

  return (
    <div className="UserDashboard">
      <div className="top flex row left sb">
        <div className="group top flex row left">
          <img src={logo} alt="" className="logo" />
          <h1>Name of the APP</h1>
        </div>
        <Link to="/LoginUser">
          <button className="btn">Logout</button>
        </Link>

      </div>
      <div className="mid flex row">
        <div className="genre flex col">
          <h1>Genre Filters</h1>
          <div className="genreList flex col">
            {genreList.map((genre, index) => (
              <div key={index} className="genreItem">
                <h4 onClick={() => {
                  setGenre(genre);
                }}>{genre}</h4>
              </div>)
            )}
          </div>
        </div>
        <div className="movie-list flex">
          {
            movieList.map((movie, index) => (
              <>
                {genre === '' &&
                  <div onClick={() => {
                    setCurrentMovie(getMovie(movie.movieid));
                  }} key={index} className="movie-item flex">
                    <Link to="/MovieReview">
                      <img src={movie.movielogo} alt="" className="movie-logo" />
                    </Link>
                  </div>}
                {movie.genre === genre &&
                  <div onClick={() => {
                    setCurrentMovie(getMovie(movie.movieid));
                  }} key={index} className="movie-item flex">
                    <Link to="/MovieReview">
                      <img src={movie.movielogo} alt="" className="movie-logo" />
                    </Link>
                  </div>}
                {genre === 'All' &&
                  <div onClick={() => {
                    setCurrentMovie(getMovie(movie.movieid));
                  }} key={index} className="movie-item flex">
                    <Link to="/MovieReview">
                      <img src={movie.movielogo} alt="" className="movie-logo" />
                    </Link>
                  </div>}
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
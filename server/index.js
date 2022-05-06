const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "movie",
});

db.connect();


app.get("/getMovieByID", (req, res) => {
  console.log(req.query.movieid)
  db.query(
    `SELECT * FROM overview where movieid=${req.query.movieid}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/Movies", (req, res) => {
  db.query(
    `SELECT * FROM overview`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addUser", (req, res) => {
  console.log(req.body);
  db.query(
    `INSERT INTO user (username, password) VALUES ('${req.body.Username}', '${req.body.Password}')`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addReview", (req, res) => {
  db.query(
    `INSERT INTO userreview (movieid, userreview, username,rating) VALUES (${req.body.movieid}, '${req.body.review}', '${req.body.username}', ${req.body.rating})`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.get("/user", (req, res) => {
  db.query(
    `SELECT * FROM User where username='${req.query.username}' and password='${req.query.password}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/userReviews", (req, res) => {
  console.log(req.query.movieid)
  db.query(
    `SELECT * FROM userreview where movieid=${req.query.movieid}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }   
    }
  );       
});
         
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

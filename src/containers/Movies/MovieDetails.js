import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinkIcon from '@material-ui/icons/Link';
import MovieIcon from '@material-ui/icons/Movie';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
  movie_header: {
    fontWeight: 400,
    lineHeight: 1.2,
    fontSize: "20px",
    color: "#263238",
    letterSpacing: "-0.5px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  tagline: {
    textTransform: "uppercase",
    lineHeight: 1.5,
    color: "#37474f",
    fontSize: "20px",
    fontWeight: 700,
  },
  ratingBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
    marginBottom: "40px",
  },
  generesList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  genereItem: {
    display: "flex",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: 1,
    color: "#546e7a",
    textTransform: "uppercase",
    textDecoration: "none",
    paddingRight: "10px",
  },
  overview: {
    fontSize: "15px",
    lineHeight: 1.8,
    color: "#444444",
    fontWeight: 300,
    marginBottom: "10px",
  },
  button:{
      marginTop : "20px",
      textDecoration : "none",
  },
  buttonLink :{
    textDecoration : "none",
    marginRight : "10px",
    marginBottom : "20px",

  },
  Icons:{
    marginRight : "10px",

  }
}));

const MovieDetails = (props) => {
  const classes = useStyles();

  const { details, videoKey } = props;
  return (
    <div>
      <div className={classes.movie_header}>{details.title}</div>
      <div className={classes.tagline}>{details.tagline}</div>
      <div className={classes.ratingBar}>
        <Rating name="read-only" value={details.vote_average / 2} readOnly />
        <span><b>{details.release_date} / {details.runtime} min </b></span>
      </div>

      <div>
        <h3>The Geners</h3>
        <ul className={classes.generesList}>
          {details.genres.map((gener, index) => {
            return (
              <li key={gener.id} className={classes.genereItem}>
                {gener.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Overview</h3>
        <p className={classes.overview}>{details.overview}</p>
      </div>
      <div className={classes.button}>
        <a href={details.homepage} style={{textDecoration:"none"}} className={classes.buttonLink}>
          <Button variant="contained" color="primary">
            <LinkIcon className={classes.Icons}/>
            <span>Website</span>
          </Button>
        </a>
        <a href={`http://imdb.com/title/${details.imdb_id}`} style={{textDecoration:"none"}} className={classes.buttonLink}>
          <Button variant="contained" color="primary">
            <MovieIcon className={classes.Icons}/>
            IMDB
          </Button>
        </a>
        <a href={`http://youtube.com/watch?v=${videoKey}`} style={{textDecoration:"none"}} className={classes.buttonLink}>
          <Button variant="contained" color="primary">
            <PlayArrowIcon className={classes.Icons}/>
            Trailer
          </Button>
        </a>
      </div>
    </div>
  );
};

export default MovieDetails;

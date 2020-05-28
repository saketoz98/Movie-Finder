import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 375,
  },
  ratingBar : {
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "stretch"
  }
});

const MovieCard = (props) => {
  const classes = useStyles();
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const MovieDetails = (id) => {
    console.log(id);
    props.history.push(`/movie/${id}`);
  };

  return (
    <Card
      className={classes.root}
      onClick={() => {
        const id = props.movie.id;
        MovieDetails(id);
      }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${imageUrl}/${props.movie.poster_path}`}
          title={props.movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.movie.overview.split(" ").splice(0, 20).join(" ")}...
          </Typography>
          <div className={classes.ratingBar}>
            <Rating
              name="read-only"
              value={props.movie.vote_average / 2}
              readOnly
            />
            <span><b>{props.movie.vote_average}</b></span>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            const id = props.movie.id;
            MovieDetails(id);
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(MovieCard);

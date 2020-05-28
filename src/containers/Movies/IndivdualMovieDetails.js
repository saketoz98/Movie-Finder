import React, { useContext, useEffect } from "react";
import { DiscoverMovieContext } from "../../context/DiscoverMovies";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MovieDetails from "./MovieDetails";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    maxWidth: "500px",
    marginTop: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },

  recommendationGrid: {
    width: "100%",
    marginTop: "50px",
  },
  recommendTitle : {
    textAlign : "center",
    marginBottom : "40px",
    marginTop : "10px",
    color : "#263238"
  }
}));

const IndivdualMovieDetails = (props) => {
  const {
    Loading,
    MovieDetail,
    getMovieDetails,
    ImdbMovieDetails,
    getMovieDetailsFromImdb,
    Key,
    getRecommendations,
    Recommendations,
  } = useContext(DiscoverMovieContext);
  const classes = useStyles();
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    getMovieDetails(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    getRecommendations(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <React.Fragment>
      {Loading || MovieDetail === null ? (
        <CircularProgress />
      ) : (
        <Grid container  className={classes.root} spacing={1}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              <Grid item className={classes.grid}>
                <img
                  style={{
                    width: "100%",
                    maxWidth: "70%",
                    borderRadius: "10px",
                    maxHeight: "100%",
                    height: "auto",
                    objectFit: "cover",
                    boxShadow: "15px 15px 5px #ccc",
                  }}
                  src={`${imageUrl}/${MovieDetail.poster_path}`}
                />
              </Grid>
              <Grid item className={classes.grid}>
                <Paper elevation={3} className={classes.paper}>
                  <MovieDetails details={MovieDetail} videoKey={Key} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              <Grid item  className={classes.recommendationGrid}>
              <h2 className={classes.recommendTitle}>Recommended Movies</h2>

                <Grid container className={classes.root} spacing={2}>

                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={3}>
                      {Recommendations.length > 0 ? Recommendations.map((movie) => {
                        return (
                          <Grid key={movie.id} item>
                            <MovieCard movie={movie} />
                          </Grid>
                        );
                      }) : <h2>No Recommendations Found</h2>}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default IndivdualMovieDetails;

import React, { useEffect, useState, useContext } from "react";
import { DiscoverMovieContext } from "../../context/DiscoverMovies";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import MovieCard from "./MovieCard";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  control: {
    padding: theme.spacing(2),
  },
}));

const DiscoveredMovieList = (props) => {
  const {
    MoviesList,
    getDiscoveredMovies,
    Loading,
    getMoviesByGenres,
    getMoviesFromSearchString,
    Error,
    setError
  } = useContext(DiscoverMovieContext);
  const classes = useStyles();

  useEffect(() => {
    console.log("usffect run");
    if (props.match.params.name) {
      getDiscoveredMovies(props.match.params.name);
    } else if (props.match.params.genre) {
      getMoviesByGenres(props.match.params.genre);
    } else {
      getMoviesFromSearchString(props.match.params.search);
    }
    return ()=>{
        setError(null);
    }
  }, [
    props.match.params.name,
    props.match.params.genre,
    props.match.params.search,
  ]);

  const grid = (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {MoviesList.map((movie) => {
            return (
              <Grid key={movie.id} item>
                <MovieCard movie={movie} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <React.Fragment>
      { Loading === true || MoviesList.length === 0 ? (
        <CircularProgress />
      ) : (
        grid
      )}
    </React.Fragment>
  );
};

export default withRouter(DiscoveredMovieList);

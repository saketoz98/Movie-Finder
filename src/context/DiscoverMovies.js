import React, { createContext, useState } from "react";
import api from "../api/api";
import {useHistory} from "react-router-dom";

export const DiscoverMovieContext = createContext();

const DiscoverMovieContextProvider = (props) => {
    let history = useHistory();

  const [MoviesList, setMoviesList] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [MovieDetail, setMovieDetail] = useState(null);
  const [ImdbMovieDetails, setImdbMovieDetails] = useState(null);
  const [Key, setKey] = useState("");
  const [Recommendations, setRecommendations] = useState([]);
  const [Error, setError] = useState(null);

  const baseUrl = "https://api.themoviedb.org/3";

  const getDiscoveredMovies = async (name) => {
    setLoading(true);
    setMoviesList([]);
    let url = null;
    if (name === "Popular") {
      url = `${baseUrl}/movie/popular/`;
    } else if (name === "Top Rated") {
      url = `${baseUrl}/movie/top_rated/`;
    } else if (name === "Upcoming") {
      url = `${baseUrl}/movie/upcoming/`;
    }else{
        history.push("/error");
        return null;
    }
    try {
      const res = await api.get(url, {
        params: {
          api_key: process.env.REACT_APP_API,
        },
      });
      // console.log(res.data);
      setMoviesList([...res.data.results]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      history.push("/error");
    }
    
  };

  const getMovieDetails = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`${baseUrl}/movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_API,
          append_to_response: "videos",
        },
      });
      // console.log(res);
      
      if(res.status === 200){
        const index = res.data.videos.results.findIndex((video) => {
          return video.type === "Trailer";
        });
        // console.log(res)
        setKey(res.data.videos.results[index].key);
        setMovieDetail(res.data);
        setLoading(false);
      }else{
        setLoading(false);
        history.push("/error");
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
    
    
  };

  const getRecommendations = async (movieId) => {
    setLoading(true);
    const res = await api.get(`${baseUrl}/movie/${movieId}/recommendations`, {
      params: {
        api_key: process.env.REACT_APP_API,
      },
    });
    setRecommendations(res.data.results);
    setLoading(false);
  };

  const getMoviesByGenres = async (genreName) => {
    setLoading(true);
    const genresId = await getGenreIds(genreName);
    const res = await api.get(`${baseUrl}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_API,
        sort_by: "popularity.desc",
        with_genres: genresId,
      },
    });
    setMoviesList(res.data.results);
    setLoading(false);
  };

  const getGenreIds = async (genreName) => {
    const res = await api.get(`${baseUrl}/genre/movie/list`, {
      params: {
        api_key: process.env.REACT_APP_API,
      },
    });

    const index = res.data.genres.findIndex((genre) => {
      return genre.name === genreName;
    });
    return res.data.genres[index].id;
  };

  const getMoviesFromSearchString = async (searchStr) => {
    const results = [];
    setLoading(true);
    // console.log(history);
    const res = await api.get(`${baseUrl}/search/movie`, {
      params: {
        api_key: process.env.REACT_APP_API,
        query: searchStr,
      },
    });
    if(res.data.results.length === 0){
        // setError("Sorry!! No Movies Found");
        setLoading(false);
        history.push("/error");
    }else{
        // console.log(res.data.results);
        setMoviesList(res.data.results);
        setLoading(false);
        // console.log(Loading);   
    }
  };

  return (
    <DiscoverMovieContext.Provider
      value={{
        MoviesList,
        Key,
        Recommendations,
        Loading,
        MovieDetail,
        ImdbMovieDetails,
        Error,
        setError,
        getRecommendations,
        getMoviesByGenres,
        getDiscoveredMovies,
        getMovieDetails,
        getMoviesFromSearchString,
      }}
    >
      {props.children}
    </DiscoverMovieContext.Provider>
  );
};

export default DiscoverMovieContextProvider;

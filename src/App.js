import React from "react";
import Dashboard from "./containers/Navigation/Dashboard";
import DiscoverMovieContextProvider from "./context/DiscoverMovies";
import "./App.css";

function App() {
  return (
    <DiscoverMovieContextProvider>
      <React.Fragment>
          <Dashboard />
      </React.Fragment>
    </DiscoverMovieContextProvider>
  );
}

export default App;

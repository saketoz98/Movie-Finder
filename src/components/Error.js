import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

const Error = (props) => {
  return (
    <div style={{ margin: "150px auto" }}>
      <h1>Something Went Wrong !!</h1>
      <div >
        <Button variant="contained" color="secondary">
          <Link to="/"><span style={{textDecoration:"none", color:"white"}}><HomeIcon/>Home</span></Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;

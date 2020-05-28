import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeIcon from "@material-ui/icons/Grade";
import UpdateIcon from "@material-ui/icons/Update";
import React, { useState, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import DiscoveredMovieList from "../Movies/DiscoveredMovieList";
import { NavLink, withRouter } from "react-router-dom";
import IndividualMovieDetails from "../Movies/IndivdualMovieDetails";
import AdjustIcon from "@material-ui/icons/Adjust";
import TextField from "@material-ui/core/TextField";
import {DiscoverMovieContext} from "../../context/DiscoverMovies";
import ErrorPage from "../../components/Error";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navLink: {
    textDecoration: "none",
    color: "#263238",
  },
  activeClass: {
    fontWeight: 700,
  },
  appBarDesign:{
    display: "flex",
    flexDirection: "row",
    justifyContent : "space-between"
  
  },
  formElement : {
    paddingRight : "30px",
    
  }
}));

const Dashboard = (props)=>{
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [Search, setSearch] = useState("");

  const {getMoviesFromSearchString} = useContext(DiscoverMovieContext);

  const onSearchChange = (e)=>{
    setSearch(e.target.value);
  }

  const onSerachSubmit = (e)=>{
    e.preventDefault();
    setSearch("");
    props.history.push(`/search/${Search}`);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="secondary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <div className={classes.appBarDesign}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Movie Finder
            </Typography>
          </Toolbar>
          <div className={classes.formElement}>
            <form autoComplete="off" onSubmit={onSerachSubmit}>
              <TextField id="standard-basic" label="Search" onChange={onSearchChange} value={Search}/>
            </form>
          </div>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <NavLink to="/discover/Popular" className={classes.navLink}>
              <ListItemText primary="Popular" />
            </NavLink>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <NavLink to="/discover/Top Rated" className={classes.navLink}>
              <ListItemText primary="Top Rated" />
            </NavLink>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <NavLink to="/discover/Upcoming" className={classes.navLink}>
              <ListItemText primary="Upcoming" />
            </NavLink>
          </ListItem>
        </List>
        <Divider />
        <List>
          {[
            "Action",
            "Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "History",
            "Horror",
            "Music",
            "Mystery",
            "Romance",
            "Science Fiction",
            "TV Movie",
            "Thriller",
            "War",
            "Western",
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <AdjustIcon />
              </ListItemIcon>
              <NavLink to={`/genres/${text}`} className={classes.navLink}>
                <ListItemText primary={text} />
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Redirect from="/" to="/discover/Popular" />}
          />
          <Route path="/discover/:name" exact component={DiscoveredMovieList} />
          <Route path="/movie/:id" exact component={IndividualMovieDetails} />
          <Route path="/genres/:genre" exact component={DiscoveredMovieList} />
          <Route path="/search/:search" exact component={DiscoveredMovieList} />
          <Route path="/error" exact component={ErrorPage} />
          <Route render={()=>(<h1>Not Found</h1>)} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(Dashboard);
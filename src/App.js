import "./App.css";
import React, { useState, useEffect } from "react";
import background from "./images/background.jpg";
import Glasscard from "./components/Glasscard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    width: "100vw",
    backgroundPosition: "center",
    height: "100",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "cover",
    objectFit: "cover",
    textAlign: "center",
    minHeight: "100vh",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  headerSpan: {
    height: "10",
    fontFamily: "Caveat",
    color: "#e3dfd5",
    fontSize: "75px",
    "backdrop-filter": "blur(20px)",
    marginBottom: "2%",
  },
}));

function App() {
  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=5`)
      .then((response) => response.json())
      .then((data) => setUsers(data.results));
  },[]);
  const [spacing, setSpacing] = useState(2);
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.headerSpan}>
        Random User profiles
      </div>
    <Grid
      container
      xs={12}
      spacing={4}
      justify="center"
    >
      {users.map((user) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            spacing={spacing}
            style={{ textAlign: "center" }}
          >
            <Glasscard style={{ display: "flex" }} user={user}/>
          </Grid>
        );
      })}
    </Grid>
    </div>
  );
}

export default App;

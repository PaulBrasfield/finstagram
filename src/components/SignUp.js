import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Input } from "@material-ui/core";
import logo from "../images/logo.png";
import ImageUpload from "../components/ImageUpload";

import { auth } from "../firebase";
import "../styles/SignUp.css";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  //Frontend Listener
  useEffect(
    () => {
      //Backend Listener
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          //User has logged in
          setUser(authUser);

          if (authUser.displayName) {
            //Don't update username
          } else {
            //Created new user
            return authUser.updateProfile({
              displayName: username,
            });
          }
        } else {
          //User has logged out
          setUser(null);
        }
      });
      return () => {
        //Perform clean-up actions
        //This allows us to remove the listener then refire the code so we don't have multiple listeners.
        unsubscribe();
      };
    },
    //Add 'user' and 'username' as dependencies since we're listening for changes
    [user, username]
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {
    setOpenLogin(true);
  };
  const handleLogOut = () => {
    auth.signOut();
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenLogin(false);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      //   .then((authUser) => {
      //       return authUser.user.updateProfile({
      //           displayName: username;
      //       })
      //   })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  return (
    <div>
      {user ? (
        <Button
          className="logOut__button"
          variant="contained"
          color="grey"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      ) : (
        <div className="app__loginContainer">
          <Button
            className="signUp__button"
            variant="contained"
            color="grey"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button variant="contained" color="grey" onClick={handleOpen}>
            Sign Up
          </Button>
        </div>
      )}
      {user?.displayName ? (
        <ImageUpload username={user.displayName}></ImageUpload>
      ) : (
        <h5>You must log in to upload</h5>
      )}
      {/* Sign Up Modal */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img className="app__headerImage" src={logo} alt="logo" />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" onClick={handleSignUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      {/* Sign In Modal */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img className="app__headerImage" src={logo} alt="logo" />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

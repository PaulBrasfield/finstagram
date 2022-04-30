import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import "./images/post_image.jpg";
import "./App.css";
import Post, { username } from "./components/Post";
import SignUp from "./components/SignUp";
import { db } from "./firebase";
import ImageUpload from "./components/ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);

  //Mapping posts each time the database changes
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      //Every time the database changes, fire code
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    //Caption -> File Pick -> Post Button

    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="logo" />
        {/* <ImageUpload username={post.username}></ImageUpload> */}
        <SignUp></SignUp>
        {/* <ImageUpload username={username}></ImageUpload> */}
      </div>

      {/* Mapping posts from database snapshot*/}
      {posts.map(({ id, post }) => (
        <Post
          username={post.username}
          avatar={post.avatar}
          caption={post.caption}
          imageUrl={post.imageUrl}
          key={id}
        />
      ))}
    </div>
  );
}

export default App;

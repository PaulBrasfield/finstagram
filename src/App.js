import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import "./images/post_image.jpg";
import "./App.css";
import Post from "./components/Post";
import SignUp from "./components/SignUp";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);

  //Mapping posts each time the database changes
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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
        <SignUp></SignUp>
      </div>

      <div className="app__posts">
        {/* Mapping posts from database snapshot*/}
        {posts.map(({ id, post }) => (
          <Post
            username={post.username}
            avatar={post.avatar}
            caption={post.caption}
            imageUrl={post.imageUrl}
            key={id}
            postId={id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

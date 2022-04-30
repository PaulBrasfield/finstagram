import React from "react";
import "../styles/Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, avatar, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        {/* Header -> Avatar -> Username */}
        <Avatar className="post__avatar" alt="username" src={avatar} />
        <h3>{username}</h3>
      </div>

      {/* Image */}
      <img className="post__image" src={imageUrl} alt="Post" />

      {/* Username -> Caption */}
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
    </div>
  );
}

export default Post;

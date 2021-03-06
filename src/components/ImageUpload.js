import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase/compat/app";
import "../styles/ImageUpload.css";
import logo from "../images/logo.png";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Progress Logic
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error Function
        alert("There was a problem uploading your image." + error.message);
        console.log(error);
      },
      () => {
        //Complete Function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //Post image inside of database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
            setOpen(false);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      {}
      <Button variant="contained" color="grey" onClick={handleOpen}>
        Upload
      </Button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className="imageUpload__modal">
          <center>
            <img className="imageUpload__headerImage" src={logo} alt="logo" />
          </center>
          <p>
            Select a file:{" "}
            <input
              className="file__Input "
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            ></input>
          </p>
          <textarea
            type="text"
            placeholder="Enter a caption"
            onChange={(event) => setCaption(event.target.value)}
            value={caption}
            className="caption__input"
          ></textarea>
          <progress value={progress} max="100"></progress>
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </Modal>

      {/* <p>
        Select a file: <input type="file" onChange={handleChange}></input>
      </p>
      <textarea
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
        className="caption__input"
      ></textarea>
      <progress value={progress} max="100"></progress>
      <Button onClick={handleUpload}>Upload</Button> */}
    </div>
  );
}

export default ImageUpload;

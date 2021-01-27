import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import firebase from "../../config/firebase";

function Previews(props) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (files.length < 1) {
      return null;
    }
    const userFile = files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(userFile.name);

    fileRef.put(userFile).then(() => {
      console.log("file uploaded");
    });
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const userImage = files.map((file) => (
    <div className="imgContainer" key={file.name}>
      <img src={file.preview} className="image" alt="preview" />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {files.length > 0 ? (
          userImage
        ) : (
          <i className="fas fa-cloud-upload-alt icon"></i>
        )}
        {files.length === 0 ? (
          <span className="button">Click To Load</span>
        ) : (
          ""
        )}
        {files.length === 0 ? (
          <span className="text">Or drag your image here</span>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Previews;

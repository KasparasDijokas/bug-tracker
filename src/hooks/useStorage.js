import { useState, useEffect } from "react";
import firebase from "../config/firebase";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file.length < 1) {
      return null;
    }
    const userFile = file[0];

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(userFile.name);

    const metadata = {
      contentType: userFile.type,
    };

    fileRef.put(file, metadata).on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await fileRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;

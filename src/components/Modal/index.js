import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import "./modal.css";
import Button from "../Button";
import Dropzone from "../../components/Dropzone/Dropzone";
import { showModal } from "../../Redux/Actions";
import { createProject } from "../../Redux/Actions";
import { syncProjects } from "../../Redux/Actions";
import firebase from "../../config/firebase";

function Modal(props) {
  const [userInput, setuserInput] = useState({
    category: "",
    platform: "",
    title: "",
  });

  const [data, setData] = useState(null);

  const formHandler = (e) => {
    setuserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const uploadFormData = (e) => {
    e.preventDefault();
    props.createProject(userInput);
    props.showModal();
  };

  const cancelModal = (e) => {
    console.log(e);
    e.preventDefault();
    props.showModal();
  };



  return (
    <>
      <div
        className={!props.modalState ? "background" : "background show"}
        onClick={() => props.showModal()}
      ></div>
      <div className={!props.modalState ? "modal" : "modal show"}>
        <div className="modal__header">
          <h3>Add project </h3>
          <span onClick={() => props.showModal()}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="modal__body">
          <form className="modal__details">
            <div className="options">
              <p>Category</p>
              <select name="category" onChange={formHandler}>
                <option>DevOp</option>
                <option>Front-end</option>
                <option>Back-End</option>
                <option>UX</option>
              </select>
            </div>
            <div className="platform">
              <p>Platform</p>
              <div onChange={formHandler}>
                <input type="radio" name="platform" value="android" />
                <label for="android">Android</label>
                <input type="radio" name="platform" value="apple" />
                <label for="apple">iOS</label>
                <input type="radio" name="platform" value="web" />
                <label for="web">Web</label>
              </div>
            </div>
            <div>
              <p>Project Title</p>
              <input
                className="project__name"
                type="text"
                onChange={formHandler}
                name="title"
              ></input>
            </div>
            <div className="buttons">
              <Button onClick={uploadFormData}>Add New Project</Button>
              <Button onClick={cancelModal} error>
                Cancel
              </Button>
            </div>
          </form>
          <div className="modal__dropzone">
            <Dropzone />
            <div className="dropzone__buttons">
              <button className="dropzone__btn btn__reload">
                <i className="fas fa-sync-alt"></i>Reload
              </button>
              <button className="dropzone__btn btn__delete">
                <i className="fas fa-trash"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    modalState: state.showModalReducer,
  };
};

export default connect(mapStateToProps, {
  showModal,
  createProject,
  syncProjects,
})(Modal);

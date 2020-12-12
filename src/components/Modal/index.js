import React from "react";
import { createPortal } from "react-dom";
import { ModalBody } from "./styles/modal";
import { connect } from "react-redux";
import "./modal.css";
import Button from '../Button';

function Modal(props) {
  return (
    <div className={!props.modalState ? "modal hide" : "modal show"}>
        <h1>Add project</h1>
        <div className="options">
            <select placeholder="Select topic">
                <option>DevOp</option>
                <option>Front-end</option>
                <option>Back-End</option>
                <option>UX</option>
            </select>
        </div>
        <div className="platform">
            <p>Platform</p>
                <input type="checkbox" name="android"/>
                <label for="android">Android</label>
                <input type="checkbox" name="apple"/>
                <label for="apple">Apple</label>
                <input type="checkbox" name="web"/>
                <label for="web">Web</label>
        </div>
        <div>
            <p>Title</p>
            <input></input>
        </div>
        <div className="buttons">
            <Button>Add New Project</Button>
            <Button error>Cancel</Button>
        </div>
        <div className="uploadContainer">
        <form >
            <input type="file" id="myFile" name="filename"/>
        </form>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalState: state.showModalReducer,
  };
};

export default connect(mapStateToProps)(Modal);

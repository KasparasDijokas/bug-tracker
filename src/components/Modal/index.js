import React from "react";
import {createPortal} from 'react-dom';
import { connect } from "react-redux";
import "./modal.css";
import Button from "../Button";
import Dropzone from "../../components/Dropzone/Dropzone";

function Modal(props) {
  return (
          <div className={!props.modalState ? "background" : "background show"}>
      <div className={!props.modalState ? "modal hide" : "modal show"}>
      <div className="modal__header">
        <h3>Add project </h3>
        <span>
          <i class="fas fa-times"></i>
        </span>
      </div>
      <div className="modal__body">
      <div className="modal__details">
        <div className="options">
          <p>Category</p>
          <select>
            <option>DevOp</option>
            <option>Front-end</option>
            <option>Back-End</option>
            <option>UX</option>
          </select>
        </div>
        <div className="platform">
          <p>Platform</p>
          <div>
          <input type="radio" id="android" name="platform"/>
          <label for="android">Android</label>
          <input type="radio" id="apple" name="platform"/>
          <label for="apple">iOS</label>
          <input type="radio" id="web" name="platform"/>
          <label for="web">Web</label>
          </div>

        </div>
        <div>
          <p>Project Title</p>
          <input className="project__name" type="text"></input>
        </div>
        <div className="buttons">
          <Button>Add New Project</Button>
          <Button error>Cancel</Button>
        </div>
        
        </div>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalState: state.showModalReducer,
  };
};

export default connect(mapStateToProps)(Modal);

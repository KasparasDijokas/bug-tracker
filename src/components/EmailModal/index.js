import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./emailModal.module.css";
import Button from "../Button";
import { showEmailModal } from "../../Redux/Actions";

function Modal({ showEmailModal, modalState }) {
  const [userInput, setuserInput] = useState({
    email: "",
    message: "",
  });

// save user input
  const formHandler = (e) => {
    setuserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
// show modal
  const sendEmailHandler = (project) => {
    showEmailModal();
  };
// cancel modal
  const cancelModal = (e) => {
    e.preventDefault();
    showEmailModal();
  };

  return (
    <>
      <div
        className={
          !modalState
            ? styles.background
            : `${styles.background} ${styles.show}`
        }
        onClick={() => showEmailModal()}
      ></div>
      <div
        className={
          !modalState ? styles.modal : `${styles.modal} ${styles.show}`
        }
      >
        <div className={styles.modal__header}>
          <h3>Invite member</h3>
          <span onClick={() => showEmailModal()}>
            <i className="fas fa-times"></i>
          </span>
        </div>

        <div className={styles.modal__body}>
          <form className={styles.modal__details}>
            <div>
              <p>Email Address</p>
              <input
                className={styles.email__name}
                type="text"
                onChange={formHandler}
                name="email"
              ></input>
            </div>

            <div className={styles.textarea__container}>
              <p>Message</p>
              <textarea
                name="message"
                id="message"
                className={styles.textarea}
                cols="30"
                rows="4"
                maxLength="2000"
                onChange={formHandler}
              ></textarea>
            </div>

            <div className={styles.buttons}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  sendEmailHandler(userInput);
                }}
              >
                Send
              </Button>
              <Button onClick={cancelModal} error>
                Cancel
              </Button>
            </div>
          </form>
          <div className={styles.modal__legend}>
            <p className={styles.legend__text}>
              Existing users are gaining access to this project immediately. An
              invitation will be sent to new users.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    modalState: state.emailModal,
  };
};

export default connect(mapStateToProps, {
  showEmailModal,
})(Modal);

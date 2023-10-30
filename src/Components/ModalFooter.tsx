import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppState } from "src/Interfaces/IState";
import { requestHelpTopic, closeHelpTopic } from "../Actions/index";
import { getAsyncHelpTopic } from "../Actions/actionMiddleware";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

const ModalFooter = (props) => {
  const helpTopic = useSelector((state: IAppState) => state.helpTopic);
  const dispatch = useDispatch();

  function closeFn() {
    //normal dispatch
    dispatch(closeHelpTopic());
  }

  //Run on change of showPopup
  useEffect(() => {
    console.log(`Change of help : ` + helpTopic.showPopup);
  }, [helpTopic.showPopup]);

  return (
    <div
      id="myModal"
      className={
        helpTopic.showPopup
          ? "modaldisplayblock modal"
          : "modaldisplaynone modal"
      }
    >
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-close" onClick={closeFn}>
            &times;
          </span>
          <h2>Help Information...</h2>
        </div>
        <div className="modal-body">
          <p id="modal-message">id:{helpTopic.code}</p>
          <p id="modal-message">title:{helpTopic.title}</p>
          <p id="modal-message">text:{helpTopic.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;

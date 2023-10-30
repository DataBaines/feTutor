import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestHelpTopic } from "../Actions";
import { getAsyncHelpTopic } from "../Actions/actionMiddleware";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "src/Interfaces/IState";
import { AnyAction } from "redux";

const HelpIcon = (props) => {
  const thunkDispatch: ThunkDispatch<IAppState, undefined, AnyAction> =
    useDispatch();

  //Run on didMount
  useEffect(() => {
    //console.log("OnMount event")
  }, []);

  function clickFn() {
    thunkDispatch(getAsyncHelpTopic(props.id));
  }

  return (
    <span className="help" onClick={clickFn}>
      ?
    </span>
  );
};

export default HelpIcon;

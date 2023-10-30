import {
  requestHelpTopic,
  requestHelpTopicCompleted,
  requestHelpTopicError,
} from "./index";
import axios from "axios";

export function getAsyncHelpTopic(id: number) {
  // Create an anonymous function that can be dispatched
  return function (dispatch) {
    dispatch(requestHelpTopic(id));
    console.log(`Calling help API for ${id}`);

    axios
      .get(`http://localhost:3000/help/${id}`)
      .then((response) => {
        dispatch(
          requestHelpTopicCompleted({
            code: id,
            text: response.data.info,
            title: "Title",
          })
        );
      })
      .catch((error) => {
        dispatch(requestHelpTopicError(error.message));
        console.log("Error");
      });
  };
}

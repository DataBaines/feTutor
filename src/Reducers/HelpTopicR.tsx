import {
  CLOSE_HELP_TOPIC,
  REQUEST_HELP_TOPIC,
  REQUEST_HELP_TOPIC_COMPLETED,
  REQUEST_HELP_TOPIC_ERROR,
} from "../Actions/index";
import { IAsyncHelpTopic } from "../Interfaces/IState";

const initialState: IAsyncHelpTopic = {
  code: 0,
  text: " ",
  title: " ",
  completed: false,
  loading: false,
  error: " ",
  showPopup: false,
};

const helpTopicR = (prevState = initialState, action) => {
  switch (action.type) {
    case REQUEST_HELP_TOPIC:
      return {
        ...prevState,
        code: action.code,
        loading: true,
        error: " ",
      };
    case REQUEST_HELP_TOPIC_COMPLETED:
      return {
        ...prevState,
        code: action.code,
        title: action.title,
        text: action.text,
        completed: true,
        loading: false,
        showPopup: true,
      };
    case REQUEST_HELP_TOPIC_ERROR:
      return {
        ...prevState,
        loading: false,
        error: action.error,
      };
    case CLOSE_HELP_TOPIC:
      return initialState;

    default:
      return prevState;
  }
};

export default helpTopicR;

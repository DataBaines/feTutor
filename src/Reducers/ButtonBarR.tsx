import {
  SELECT_GAUSS,
  SELECT_GLOBAL_STIFFNESS,
  SELECT_MESH,
  GENERATE_MESH,
  DISPLAY_HELP,
  NEW_MODEL_PENDING,
  TOGGLE_NODE_MOVE,
  TOGGLE_MESH3D,
  SHOW_NODE_MOVE,
} from "../Actions/index";
import { IButtonBarState } from "../Interfaces/IState";

const buttonBarR = (prevState: IButtonBarState = initialState, action) => {
  switch (action.type) {
    case SELECT_MESH:
      return {
        ...prevState,
        centreSectionContent: "mesh",
        moveNodeMode: {
          visible: true,
          on: false,
        },
        mesh3D: {
          visible: true,
          on: false,
        },
      };
    case SELECT_GAUSS:
      return {
        ...prevState,
        centreSectionContent: "gauss",
        moveNodeMode: {
          visible: false,
          on: false,
        },
        mesh3D: {
          visible: false,
          on: false,
        },
      };
    case SELECT_GLOBAL_STIFFNESS:
      return {
        ...prevState,
        // globalStiffness: {
        //     ...prevState.globalStiffness,
        //     on: true,
        // },
        centreSectionContent: "global",
        moveNodeMode: {
          visible: false,
          on: false,
        },
        mesh3D: {
          visible: false,
          on: false,
        },
      };
    // case SHOW_GLOBAL_STIFFNESS:
    //     return {
    //         ...prevState,
    //         globalStiffness: {
    //             ...prevState.globalStiffness,
    //             on: action.payload,
    //         }
    //     }
    case DISPLAY_HELP:
      return {
        ...prevState,
        help: {
          visible: true,
        },
      };
    case GENERATE_MESH:
      return {
        ...prevState,
        generate: {
          visible: true,
        },
      };
    case SHOW_NODE_MOVE:
      return {
        ...prevState,
        moveNodeMode: {
          visible: action.payload,
          on: prevState.moveNodeMode.on,
        },
      };
    case TOGGLE_NODE_MOVE:
      return {
        ...prevState,
        moveNodeMode: {
          visible: prevState.moveNodeMode.visible,
          on: action.payload,
        },
      };
    case TOGGLE_MESH3D:
      const x = 1;
      return {
        ...prevState,
        mesh3D: {
          visible: prevState.mesh3D.visible,
          on: action.payload,
        },
        moveNodeMode: {
          visible: !action.payload,
          on: false,
        },
      };
    default:
      return prevState;
  }
};

const initialState = {
  // mesh: {
  //     visible: true, on: true
  // },
  // gauss: {
  //     visible: true, on: false
  // },
  // globalStiffness: {
  //     visible: true, on: false
  // },
  help: {
    visible: true,
  },
  generate: {
    visible: true,
  },
  moveNodeMode: {
    visible: true,
    on: false,
  },
  mesh3D: {
    visible: true,
    on: false,
  },
  centreSectionContent: "mesh",
};

export default buttonBarR;

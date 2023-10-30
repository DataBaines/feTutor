import {
  enumControlColumnElement,
  IAsyncHelpTopic,
  IFe3SelElement,
} from "src/Interfaces/IState";

let nextTodoId = 0;

export const CREATE_HW = "CREATE_HW";

export const createHW = (height: number, width: number) => ({
  type: CREATE_HW,
  height,
  width,
});

export const SELECT_MESH = "SELECT_MESH";
export const SELECT_GAUSS = "SELECT_GAUSS";
export const SELECT_GLOBAL_STIFFNESS = "SELECT_GLOBAL_STIFFNESS";
export const DISPLAY_HELP = "DISPLAY_HELP";
export const GENERATE_MESH = "GENERATE_MESH";
// export const SHOW_MESH = 'SHOW_MESH'
// export const SHOW_GAUSS = 'SHOW_GAUSS'
// export const SHOW_GLOBAL_STIFFNESS = 'SHOW_GLOBAL_STIFFNESS'
export const SHOW_HELP = "SHOW_HELP";
export const SHOW_NODE_MOVE = "SHOW_NODE_MOVE";
export const TOGGLE_NODE_MOVE = "TOGGLE_NODE_MOVE";
export const TOGGLE_MESH3D = "TOGGLE_MESH3D";

export const meshPress = () => {
  return { type: SELECT_MESH };
};

export const gaussPress = () => {
  return { type: SELECT_GAUSS };
};

export const globalPress = () => {
  return { type: SELECT_GLOBAL_STIFFNESS };
};

export const generatePress = () => {
  return { type: GENERATE_MESH };
};

export const helpPress = () => {
  return { type: DISPLAY_HELP };
};

// export const meshShow = (show: boolean) => {
//   return ({ type: SHOW_MESH, payload: show })
// }

// export const gaussShow = (show: boolean) => {
//   return ({ type: SHOW_GAUSS, payload: show })
// }

// export const generateShow = (show: boolean) => {
//   return ({ type: SHOW_MESH, payload: show })
// }

export const helpShow = (show: boolean) => {
  return { type: SHOW_HELP, payload: show };
};

// export const globalShow = (show: boolean) => {
//   return ({ type: SHOW_GLOBAL_STIFFNESS, payload: show })
// }

export const nodeMoveShow = (show: boolean) => {
  return { type: SHOW_NODE_MOVE, payload: show };
};

export const nodeMoveToggle = (setToggle: boolean) => {
  return { type: TOGGLE_NODE_MOVE, payload: setToggle };
};

export const nodeMesh3DToggle = (setToggle: boolean) => {
  return { type: TOGGLE_MESH3D, payload: setToggle };
};

export const OPEN_HELP = "OPEN_HELP";

export const openHelpSidebar = (isOpenHelp: boolean, width: number) => {
  return {
    type: OPEN_HELP,
    isOpenHelp,
    width,
  };
};

export const OPEN_COMPONENT = "OPEN_COMPONENT";

export const openComponent = (openComp: enumControlColumnElement) => {
  return {
    type: OPEN_COMPONENT,
    openComp,
  };
};

export const VISIBLE_COMPONENT = "VISIBLE_COMPONENT";

export const visibleComponent = () => {
  return { type: VISIBLE_COMPONENT };
};

export const SET_INSTRUCTION = "SET_INSTRUCTION";

export const setInstruction = (text: string) => {
  return {
    type: SET_INSTRUCTION,
    text,
  };
};

export const UPDATE_THREE_SETUP = "UPDATE_THREE_SETUP";

export const updateThreeSetup = (threeSetup: any) => {
  return {
    type: UPDATE_THREE_SETUP,
    threeSetup,
  };
};

export const LOAD_ALGEBRA = "LOAD_ALGEBRA";

export const loadAlgebra = (values) => {
  return {
    type: LOAD_ALGEBRA,
    data: values,
    // topax2: values.topax2,
    // topbx: values.topbx,
    // topc: values.topc,
    // rhax2: values.rhax2,
    // rhbx: values.rhbx,
    // rhc: values.rhc,
    // botax2: values.botax2,
    // botbx: values.botbx,
    // botc: values.botc,
    // lhax2: values.lhax2,
    // lhbx: values.lhbx,
    // lhc: values.lhc
  };
};

export const NodeLine = {
  ROW: "ROW",
  COLUMN: "COLUMN",
  SINGLE: "SINGLE",
};

export const NODE_SELECT = "NODE_SELECT";

export const nodeSelect = (id: number) => {
  return {
    type: NODE_SELECT,
    id,
  };
};

export const LINKBAR_SELECT = "LINKBAR_SELECT";

export const linkbarSelect = (id: number, position: number) => {
  return {
    type: LINKBAR_SELECT,
    id,
    position,
  };
};

export const ELEMENT_SELECT = "ELEMENT_SELECT";

export const elementSelect = (stiffnessObj: IFe3SelElement) => {
  return {
    type: ELEMENT_SELECT,
    id: stiffnessObj.elementID,
    stiffnessMatrix: stiffnessObj.stiffnessMatrix,
  };
};

export const MODEL_UPDATE_SUCCESS = "MODEL_UPDATE_SUCCESS";

export function modelUpdateSuccess(newModel) {
  return {
    type: MODEL_UPDATE_SUCCESS,
    nodes: newModel.nodes,
    linkbars: newModel.linkbars,
    elements: newModel.elements,
    globalStiffness: newModel.globalStiffness,
    gauss: newModel.gauss,
    height: newModel.height,
    width: newModel.width,
    stage: newModel.stage,
  };
}

export const NEW_MODEL_PENDING = "NEW_MODEL_PENDING";

export const newModelPending2 = (boolState: boolean) => {
  return {
    type: NEW_MODEL_PENDING,
    boolState: boolState,
  };
};

export const REQUEST_HELP_TOPIC = "REQUEST_HELP_TOPIC";
export const REQUEST_HELP_TOPIC_COMPLETED = "REQUEST_HELP_TOPIC_COMPLETED";
export const REQUEST_HELP_TOPIC_ERROR = "REQUEST_HELP_TOPIC_ERROR";
export const CLOSE_HELP_TOPIC = "CLOSE_HELP_TOPIC";

export const requestHelpTopic = (id: number) => {
  return {
    type: REQUEST_HELP_TOPIC,
    code: id,
  };
};

export const requestHelpTopicCompleted = (payload: any) => {
  return {
    type: REQUEST_HELP_TOPIC_COMPLETED,
    code: payload.code,
    text: payload.text,
    title: payload.title,
  };
};

export const requestHelpTopicError = (err: string) => {
  return {
    type: REQUEST_HELP_TOPIC_ERROR,
    error: err,
  };
};

export const closeHelpTopic = () => {
  return {
    type: CLOSE_HELP_TOPIC,
  };
};

//Concise alternative
export const remodelPending = (boolState: boolean) => ({
  type: NEW_MODEL_PENDING,
  boolState: boolState,
});

import {SELECT_GAUSS, SELECT_GLOBAL_STIFFNESS, SELECT_MESH, GENERATE_MESH, DISPLAY_HELP,  
    NEW_MODEL_PENDING, TOGGLE_NODE_MOVE, TOGGLE_MESH3D} from '../Actions/index'
import { IButtonBarState } from '../Interfaces/IState'

const buttonBarR = (prevState: IButtonBarState = initialState, action) => {
    switch (action.type) {
        case SELECT_MESH:
            return {
                ...prevState,
                // mesh: {   
                //     ...prevState.gauss,
                //     on: true,
                // },
                centreSectionContent: "mesh",
            }
        case SELECT_GAUSS:
            return {
                ...prevState,
                // gauss: {   
                //     ...prevState.gauss,
                //     on: true,
                // },
                centreSectionContent: "gauss",
            }
        case SELECT_GLOBAL_STIFFNESS:
            return {
                ...prevState,
                // globalStiffness: {   
                //     ...prevState.globalStiffness,
                //     on: true,
                // },
                centreSectionContent: "global",
            }   
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
                }
            }
        case GENERATE_MESH:
            return {
                ...prevState,
                generate: {   
                    visible: true,
                }
            }
        case TOGGLE_NODE_MOVE:
            return {
                ...prevState,
                moveNodeMode: {   
                    visible: true,
                    on: action.payload,
                }
            }
        case TOGGLE_MESH3D:
            return {
                ...prevState,
                mesh3D: {   
                    visible: true,
                    on: action.payload,
                }
            }
        default:
        return prevState
    }
}

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
        visible: true
    },
    generate: {
        visible: true
    },
    moveNodeMode: {
        visible: true, on: false
    },
    mesh3D: {
        visible: true, on: false
    },
    centreSectionContent: "mesh",
}

export default buttonBarR
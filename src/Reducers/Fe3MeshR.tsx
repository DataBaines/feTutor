
import { MODEL_UPDATE_SUCCESS } from "../Actions/index"
import {IFe3MeshState} from '../Interfaces/IState'

const initialState: IFe3MeshState = {
    nodes: null,
    linkBars: null,
    elements: null,
    globalStiffness: null,
    gauss: null,
    height: 1,
    width: 1,
    stage: 0,
    flags: {
      canGenerateMesh: false,
      canShowGauss: false,
      canShowGlobal: false,
      canSubmitAlgebra: false,
      canShowMoveNode: false,
      canShowMesh3D: false
    }
}

const fe3MeshR = (prevState: IFe3MeshState = initialState , action) => {
  switch(action.type) {
    case MODEL_UPDATE_SUCCESS:
        return {
            //...prevState,
            nodes: action.nodes,
            elements: action.elements,
            linkBars: action.linkbars,
            globalStiffness: action.globalStiffness,
            gauss: action.gauss,
            height: action.height,
            width: action.width,
            stage: action.stage,
            flags: {
              ...prevState.flags,
              canGenerateMesh: action.stage === 1 && action.nodes && action.nodes.length > 4,
              canSubmitAlgebra: action.stage > 1,
              canShowGauss: action.stage === 3,
              canShowGlobal: action.stage === 3,
              canShowMoveNode: action.stage === 3,
              canShowMesh3D: action.stage === 3,
            }
        }
  
    default:
  return prevState
  }
}

export default fe3MeshR
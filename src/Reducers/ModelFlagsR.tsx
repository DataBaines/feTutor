import { nodeMove } from "src/Actions/actionUpdateModel"
import { LINKBAR_SELECT, MODEL_UPDATE_SUCCESS, NEW_MODEL_PENDING, nodeSelect, } from "../Actions/index"
import {IFe3MeshState, IFe3NodeState, IModelFlags} from '../Interfaces/IState'

const initialState: IModelFlags = {
  newModelPending: false
}

const fe3MeshR = (prevState: IModelFlags = initialState , action) => {
  switch(action.type) {

    case NEW_MODEL_PENDING:
          return {
              newModelPending: action.boolState
          } 
    default:
  return prevState
  }
}

export default fe3MeshR
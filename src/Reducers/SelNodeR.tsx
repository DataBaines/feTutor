import { NODE_SELECT} from "../Actions/index"
import {IFe3SelNode} from '../Interfaces/IState'

const initialState: IFe3SelNode = {
    nodeID: -1
}

const selNodeR = (prevState: IFe3SelNode = initialState , action) => {
  switch (action.type) {
    case NODE_SELECT:
    {
      //console.log('Current node:' + prevState.nodeID );
      return {
          nodeID: prevState.nodeID === action.id? -1: action.id
        }
    }

    default:
  return prevState
  }
}

export default selNodeR
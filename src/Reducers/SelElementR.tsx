import { ELEMENT_SELECT} from "../Actions/index"
import {IFe3SelElement} from '../Interfaces/IState'

const initialState: IFe3SelElement = {
    elementID: -1,
    stiffnessMatrix: {
      node1:{nodenumber:0, n1:-1, n2:-1, n3:-1},
      node2:{nodenumber:0, n1:-1, n2:-1, n3:-1},
      node3:{nodenumber:0, n1:-1, n2:-1, n3:-1},
    }
}

const selElementR = (prevState: IFe3SelElement = initialState , action) => {
   switch (action.type) {
    case ELEMENT_SELECT:
    {
      return {
        // elementID: prevState.elementID === action.id? -1: action.id,
        elementID: action.id,
        stiffnessMatrix: action.stiffnessMatrix
      }
    }
    default:
  return prevState
  }
}

export default selElementR
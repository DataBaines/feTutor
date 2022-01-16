import {VISIBLE_COMPONENT, SET_INSTRUCTION} from '../Actions/index'
import { INodeControl, enumControlColumnElement } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'

const initialState: INodeControl = {
    content: {
        text: "Node control..."
    },
    wrapper: {
        visible: true,
        height: 30,
        id: enumControlColumnElement.NodeControl
    }
}

const nodeControlR = (prevState = initialState, action) => {

  switch (action.type) {
    case VISIBLE_COMPONENT:
        return {
            ...prevState,
            wrapper: collapsibleWrapperR(prevState.wrapper, action)
        }
    case SET_INSTRUCTION:
        return {
            ...prevState,
            content: nodeControlTextR(prevState.content, action)
        }
    default:
        return prevState
    }
}

const nodeControlTextR = (prevState, action) => {
  switch (action.type) {
    case SET_INSTRUCTION: {
        return { 
            //...prevState,
            text: action.text 
        }
    }
    default:
        return prevState
    }
}


export default nodeControlR
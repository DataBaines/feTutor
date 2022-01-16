import {VISIBLE_COMPONENT, SET_INSTRUCTION} from '../Actions/index'
import { IBoundary, enumControlColumnElement } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'

const initialState: IBoundary = {
    content: {
        text: "Boundary..."
    },
    wrapper: {
        visible: true,
        height: 30,
        id: enumControlColumnElement.Algebra
    }
}

const boundaryR = (prevState = initialState, action) => {

  switch (action.type) {
    case VISIBLE_COMPONENT:
        return {
            ...prevState,
            wrapper: collapsibleWrapperR(prevState.wrapper, action)
        }
    case SET_INSTRUCTION:
        return {
            ...prevState,
            content: boundaryTextR(prevState.content, action)
        }
    default:
        return prevState
    }
}

const boundaryTextR = (prevState, action) => {
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


export default boundaryR
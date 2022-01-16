import {VISIBLE_COMPONENT, SET_INSTRUCTION} from '../Actions/index'
import { IInstructions, enumControlColumnElement } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'

const initialState: IInstructions = {
    content: {
        text: "Instructions..."
    },
    wrapper: {
        visible: true,
        height: 30,
        id: enumControlColumnElement.Instructions
    }
}

const instructionsR = (prevState = initialState, action) => {

  switch (action.type) {
    case VISIBLE_COMPONENT:
        return {
            ...prevState,
            wrapper: collapsibleWrapperR(prevState.wrapper, action)
        }
    case SET_INSTRUCTION:
        return {
            ...prevState,
            content: instrTextR(prevState.content, action)
        }
    default:
        return prevState
    }
}

const instrTextR = (prevState, action) => {
   // return action.text ? action.text : prevState
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


export default instructionsR
import {VISIBLE_COMPONENT, SET_INSTRUCTION} from '../Actions/index'
import { IConsoleDisplay, enumControlColumnElement } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'

const initialState: IConsoleDisplay = {
    content: {
        text: "Console..."
    },
    wrapper: {
        visible: true,
        height: 30, 
        id:enumControlColumnElement.Console
    }
}

const consoleDisplayR = (prevState = initialState, action) => {

  switch (action.type) {
    case VISIBLE_COMPONENT:
        return {
            ...prevState,
            wrapper: collapsibleWrapperR(prevState.wrapper, action)
        }
    case SET_INSTRUCTION:
        return {
            ...prevState,
            content: consoleTextR(prevState.content, action)
        }
    default:
        return prevState
    }
}

const consoleTextR = (prevState, action) => {
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

export default consoleDisplayR
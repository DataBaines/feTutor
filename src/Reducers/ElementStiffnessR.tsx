import {VISIBLE_COMPONENT, SET_INSTRUCTION} from '../Actions/index'
import { IElementStiffness, enumControlColumnElement } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'

const initialState: IElementStiffness = {
    content: {
        text: "Element stiffness..."
    },
    wrapper: {
        visible: true,
        height: 30,
        id: enumControlColumnElement.ElementStiffness
    }
}

const elementStiffnessR = (prevState = initialState, action) => {

  switch (action.type) {
    case VISIBLE_COMPONENT:
        return {
            ...prevState,
            wrapper: collapsibleWrapperR(prevState.wrapper, action)
        }
    case SET_INSTRUCTION:
        return {
            ...prevState,
            content: elementStiffnessTextR(prevState.content, action)
        }
    default:
        return prevState
    }
}

const elementStiffnessTextR = (prevState, action) => {
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


export default elementStiffnessR
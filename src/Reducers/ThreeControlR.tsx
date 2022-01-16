import {VISIBLE_COMPONENT, UPDATE_THREE_SETUP} from '../Actions/index'
import { IThreeControl, enumControlColumnElement } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'
import THREE_COLOURS from '../Components/Threejs/ThreeColours'

const initialState: IThreeControl = {
    content: {
        renderScale: 0.8,
        linkbarRadius: 4,
        nodeRadius: 10,
        elementDepth: 1,
        nodeColour: THREE_COLOURS.NODE, //"#FF0000",
        nodeColourSelected: THREE_COLOURS.NODE_SELECTED, //"#0000FF",
        nodeColourMoveable: THREE_COLOURS.NODE_MOVEABLE, //"#33FF77",
        elementColour: THREE_COLOURS.ELEMENT, //"#D6D6B2",
        elementColourSelected: THREE_COLOURS.ELEMENT_SELECTED, //"#FF6600",
        linkbarColour: THREE_COLOURS.LINKBAR, //"#E3D510"
    },
    wrapper: {
        visible: true,
        height: 30,
        id: enumControlColumnElement.ThreeControls
    }
}

const threeControlR = (prevState = initialState, action) => {

  switch (action.type) {
    case VISIBLE_COMPONENT:
        return {
            ...prevState,
            wrapper: collapsibleWrapperR(prevState.wrapper, action)
        }
    case UPDATE_THREE_SETUP:
        return {
            ...prevState,
            content: threeControlUpdateR(prevState.content, action)
        }
    default:
        return prevState
    }
}

const threeControlUpdateR = (prevState, action) => {
  switch (action.type) {
    case UPDATE_THREE_SETUP: {
        return { 
            ...prevState,
            renderScale: action.threeSetup.renderScale,
            linkbarRadius: action.threeSetup.linkbarRadius,
            nodeRadius: action.threeSetup.nodeRadius,
            elementDepth: action.threeSetup.elementDepth,
            nodeColour: action.threeSetup.nodeColour,
            nodeColourSelected: action.threeSetup.nodeColourSelected,
            nodeColourMoveable: action.threeSetup.nodeColourMoveable, 
            elementColour: action.threeSetup.elementColour,
            elementColourSelected: action.threeSetup.elementColourSelected,
            linkbarColour: action.threeSetup.linkbarColour
        }
    }
    default:
        return prevState
    }
}

export default threeControlR


import {VISIBLE_COMPONENT} from '../Actions/index'
import { IHWCreate, enumControlColumnElement } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'

const initialState: IHWCreate = {
    wrapper: {

        visible: true,
        height: 30,
        id: enumControlColumnElement.HWCreate
    }
}

const hwCreateR = (prevState = initialState, action) => {

  switch (action.type) {
    case VISIBLE_COMPONENT:
        return {
            ...prevState,
            wrapper: collapsibleWrapperR(prevState.wrapper, action)
        }
    default:
        return prevState
    }
}

export default hwCreateR

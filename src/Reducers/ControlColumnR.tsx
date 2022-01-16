import { OPEN_COMPONENT} from '../Actions/index'
import { enumControlColumnElement, IControlColumn } from '../Interfaces/IState'
import collapsibleWrapperR from './CollapsibleWrapperR'

const initialState: IControlColumn = {
    openControl: enumControlColumnElement.HWCreate
}

const controlColumnR = (prevState = initialState, action) => {

  switch (action.type) {
    case OPEN_COMPONENT:
        return {
            openControl: action.openComp
        }

    default:
        return prevState
    }
}

export default controlColumnR
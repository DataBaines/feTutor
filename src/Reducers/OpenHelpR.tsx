import { OPEN_HELP} from '../Actions/index'
import { IOpenHelp } from '../Interfaces/IState'

const initialState: IOpenHelp = {
    isOpen: false,
    width: 330
}

const openHelpR = (prevState = initialState, action) => {

  switch (action.type) {
    case OPEN_HELP:
        console.log(action)
        return {
            width: action.width,
            isOpen: action.isOpenHelp
        }

    default:
        return prevState
    }
}

export default openHelpR
import {VISIBLE_COMPONENT} from '../Actions/index'
import { ICollapsible } from '../Interfaces/IState'

// const inititalValues: ICollapsible = {
//   open: false,
//   visible: true,
//   height: 30
// }

const collapsibleWrapperR = (prevState: ICollapsible, action) => {
  
  if(prevState.id !== action.id){
    return prevState
  }

  switch (action.type) {

    case VISIBLE_COMPONENT:
      return {
        ...prevState,
        visible: !prevState.visible
      }
    default:
      return prevState
  }
}

export default collapsibleWrapperR
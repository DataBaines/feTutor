import { IBoundaryParams } from '../Interfaces/IState'
import {LOAD_ALGEBRA} from '../Actions/index'

const defaultAlgebra: IBoundaryParams = {
  topax2: 0,  topbx: 0,  topc: 0,
  rhax2: 0,  rhbx: 0,  rhc: 0,
  botax2: 0,  botbx: 0,  botc: 0,
  lhax2: 0,  lhbx: 0,  lhc: 0
}

const algebraR = (prevState = defaultAlgebra, action) => {
  switch (action.type) {
    case LOAD_ALGEBRA:
      return {
        ...prevState,
        topax2: action.data.topax2,
        topbx: action.data.topbx,
        topc: action.data.topc,
        rhax2: action.data.rhax2,
        rhbx: action.data.rhbx,
        rhc: action.data.rhc,
        botax2: action.data.botax2,
        botbx: action.data.botbx,
        botc: action.data.botc,
        lhax2: action.data.lhax2,
        lhbx: action.data.lhbx,
        lhc: action.data.lhc,
      }
    default:
      return prevState
  }
}

/**
 * Simulates data loaded into this reducer from somewhere
 */
//export const load = data => ({ type: LOAD_ALGEBRA, data })

export default algebraR
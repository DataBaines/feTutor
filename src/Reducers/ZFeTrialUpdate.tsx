// import { CREATE_NEW_MESH } from "../Actions/index"
// import { FeMesh } from "../FeModel/feMesh"
// import {store} from '../AppFE1'
// //import {ItrialState, IAppState} from '../Interfaces/IState'


// const initialState = {
//     ht: 1,
//     wi: 1
// }

// let feMesh: FeMesh

// const feModelUpdate = (state: ItrialState = initialState, action) => {
//     switch (action.type) {
//       case CREATE_NEW_MESH:
//           {
//             //console.log('New Mesh object, Current height' + state.ht + '  New height' + action.ht);
//             //console.log('New Mesh object, Current width ' + state.wi + '  New width ' + action.wi);
            
//             feMesh = new FeMesh(action.wi, action.ht)
//             return {...state, ht: action.ht, wi: action.wi}
//           }
//       default:
//         return state
//     }
// }

// export default feModelUpdate


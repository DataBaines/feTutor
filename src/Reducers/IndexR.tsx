import { combineReducers } from 'redux' //Change my combine reducers to the immutable one below!!!!
//import hwCreateR from './HWCreateR' not needed, now a form
//import feTrialUpdate from './ZFeTrialUpdate'
import { IAppState } from 'src/Interfaces/IState'
import { reducer as form } from 'redux-form'///immutable' // <--- immutable import  or not!!!!
import fe3MeshR from './Fe3MeshR'
import modelFlagsR from './ModelFlagsR'
import selNodeR from './SelNodeR'
import selElementR from './SelElementR'
import buttonBarR from './ButtonBarR'
import algebraR from './AlgebraR'
import instructionsR from './InstructionsR'
import boundaryR from './BoundaryR'
import nodeControlR from './NodeControlR'
import elementStiffnessR from './ElementStiffnessR'
import consoleDisplayR from './ConsoleDisplayR'
import threeControlR from './ThreeControlR'
import hwCreateR from './HWCreateR'
import controlColumnR from './ControlColumnR'
import openHelpR from './OpenHelpR'

export default combineReducers<IAppState>({
//  trialstate: feTrialUpdate,
//  hwState: hwCreateR,
  fe3Mesh: fe3MeshR,
  modelFlags: modelFlagsR,
  selNode: selNodeR,
  selElement: selElementR,
  buttons: buttonBarR,
  form,
  algebraForm: algebraR,
  instructions: instructionsR,
  boundary: boundaryR,
  nodeControl: nodeControlR,
  elementStiffness: elementStiffnessR,
  consoleDisplay: consoleDisplayR,
  threeControl: threeControlR,
  hwCreate: hwCreateR,
  controlColumn: controlColumnR,
  openHelp: openHelpR,
})

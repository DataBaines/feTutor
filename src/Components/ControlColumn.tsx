import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { gaussPress as gaussPressAction, 
    globalPress as globalPressAction, 
    helpPress as helpPressAction} from '../Actions/index'
import { IAppState, enumControlColumnElement } from '../Interfaces/IState'
import {newModel} from '../Actions/actionUpdateModel'
import ThreeControl from './ThreeControl'
import Instructions from './Instructions'
import Algebra from './Algebra'
import HWCreate from './HWCreate'
import ConsoleDisplay from './ConsoleDisplay'
import NodeControl from './NodeControl'
import Collapsible from './Collapsible'
import ElementStiffness from './ElementStiffness'


const ControlColumn = (props) => {

  //const {gaussPress, generatePress, helpPress, globalPress, gaussButtonProps, generateButtonProps, helpButtonProps, globalButtonProps } = buttonsProps
  const { dispatch } = props

  //Run on didMount
  useEffect(() => {
      console.log("Buttons OnMount event no longer") 
    }, [])

  useEffect(() => {
      console.log("Buttons props change event none")
    }, [props])

    //const handleCollapseClick = () => dispatch()
    
    // function handleHWSubmit(values, dispatch) {
    //     // dispatch(newModel(values.height, values.width))
    // }

    // function handleThreeSubmit(values) {
    //   const { dispatch } = this.props;
    
    //  //dispatch(actions.submit('user'));
    // }

    let isOpenAlgebra = props.openControl === enumControlColumnElement.Algebra
    let isOpenInstructions = props.openControl === enumControlColumnElement.Instructions
    let isOpenHWCreate = props.openControl === enumControlColumnElement.HWCreate
    let isOpenConsole = props.openControl === enumControlColumnElement.Console
    let isOpenNodeControl = props.openControl === enumControlColumnElement.NodeControl
    let isOpenThreeControl = props.openControl === enumControlColumnElement.ThreeControls
    let isOpenElementStiffness = props.openControl === enumControlColumnElement.ElementStiffness
    
    let isVisibleAlgebra = props.boundaryWrapper.visible
    let isVisibleInstructions = props.instructionWrapper.visible
    let isVisibleHWCreate = props.hwCreateWrapper.visible
    let isVisibleConsole = props.consoleDisplayWrapper.visible
    let isVisibleNodeControl = props.nodeControlWrapper.visible
    let isVisibleThreeControl = props.threeControlWrapper.visible
    let isVisibleElementStiffness = props.elementStiffnessWrapper.visible
    
    return (
        <div id="sidecontrols">
            { isVisibleInstructions && <Collapsible title="Instructions:" state={props.instructionWrapper.open} id={enumControlColumnElement.Instructions} /> }
            { isOpenInstructions && <Instructions /> }
            { isVisibleAlgebra && <Collapsible title="Boundary Algebra:" state={props.boundaryWrapper.open} id={enumControlColumnElement.Algebra}/> }
            { isOpenAlgebra && <Algebra  /> }
            { isVisibleConsole && <Collapsible title="Console:" state={props.consoleDisplayWrapper.open} id={enumControlColumnElement.Console} /> }
            { isOpenConsole && <ConsoleDisplay /> }
            { isVisibleNodeControl && <Collapsible title="Node Control:" state={props.nodeControlWrapper.open} id={enumControlColumnElement.NodeControl}/> }
            { isOpenNodeControl && <NodeControl /> }
            { isVisibleElementStiffness && <Collapsible title="Element Stiffness Matrix:" state={props.elementStiffnessWrapper.open} id={enumControlColumnElement.ElementStiffness} /> }
            { isOpenElementStiffness && <ElementStiffness /> }        
            { isVisibleThreeControl && <Collapsible title="Three JS Controls:" state={props.threeControlWrapper.open} id={enumControlColumnElement.ThreeControls} /> }
            {/* { isOpenThreeControl && <ThreeControl onSubmit={handleThreeSubmit}/> }         */}
            { isOpenThreeControl && <ThreeControl /> }        
            { isVisibleHWCreate && <Collapsible title="New Mesh Creation:" state={props.hwCreateWrapper.open} id={enumControlColumnElement.HWCreate} /> }
            {/* { isOpenHWCreate && <HWCreate  onSubmit={handleHWSubmit}/> } */}
            { isOpenHWCreate && <HWCreate /> }
        </div>
    )
}

// Fe3Mesh.propTypes = {
//     node: PropTypes.shape({
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         completed: PropTypes.bool.isRequired,
//         text: PropTypes.string.isRequired
//       }).isRequired}
//     ).isRequired,
//     linkBar: PropTypes.func.isRequired,
//     triangle: PropTypes.func.isRequired
//   }

const mapStateToProps = (allState: IAppState) => {   
    return{ 
      instructionWrapper: allState.instructions.wrapper,
      boundaryWrapper: allState.boundary.wrapper,
      nodeControlWrapper: allState.nodeControl.wrapper,
      elementStiffnessWrapper: allState.elementStiffness.wrapper,
      consoleDisplayWrapper: allState.consoleDisplay.wrapper,
      threeControlWrapper: allState.threeControl.wrapper,
      hwCreateWrapper: allState.hwCreate.wrapper,
      openControl: allState.controlColumn.openControl
    }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     //gaussPress: () => {dispatch(gaussPressAction())},
//     generateClick: () => {dispatch(generateMeshAction())},
//     //globalPress: () => {dispatch(globalPressAction())},
//     //helpPress: () => {dispatch(helpPressAction())},
//   }
// }

export default connect(
  mapStateToProps, 
  null
  )(ControlColumn)
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { IAppState, enumControlColumnElement } from '../Interfaces/IState'
import ThreeControl from './ThreeControl'
import Instructions from './Instructions'
import Algebra from './Algebra'
import HWCreate from './HWCreate'
import ConsoleDisplay from './ConsoleDisplay'
import NodeControl from './NodeControl'
import Collapsible from './Collapsible'
import ElementStiffness from './ElementStiffness'

const ControlColumn = () => {

  const {openControl} = useSelector((state: IAppState) => state.controlColumn)
  const {boundary, instructions, hwCreate, consoleDisplay, nodeControl, threeControl, elementStiffness} = useSelector((state: IAppState) => state)
 
    let isOpenAlgebra = openControl === enumControlColumnElement.Algebra
    let isOpenInstructions = openControl === enumControlColumnElement.Instructions
    let isOpenHWCreate = openControl === enumControlColumnElement.HWCreate
    let isOpenConsole = openControl === enumControlColumnElement.Console
    let isOpenNodeControl = openControl === enumControlColumnElement.NodeControl
    let isOpenThreeControl = openControl === enumControlColumnElement.ThreeControls
    let isOpenElementStiffness = openControl === enumControlColumnElement.ElementStiffness
    
    let isVisibleAlgebra = boundary.wrapper.visible
    let isVisibleInstructions = instructions.wrapper.visible
    let isVisibleHWCreate = hwCreate.wrapper.visible
    let isVisibleConsole = consoleDisplay.wrapper.visible
    let isVisibleNodeControl = nodeControl.wrapper.visible
    let isVisibleThreeControl = threeControl.wrapper.visible
    let isVisibleElementStiffness = elementStiffness.wrapper.visible
    
    return (
        <div id="sidecontrols">
            { isVisibleInstructions && <Collapsible title="Instructions:" id={enumControlColumnElement.Instructions} /> }
            { isOpenInstructions && <Instructions /> }
            { isVisibleAlgebra && <Collapsible title="Boundary Algebra:" id={enumControlColumnElement.Algebra}/> }
            { isOpenAlgebra && <Algebra  /> }
            { isVisibleConsole && <Collapsible title="Console:" id={enumControlColumnElement.Console} /> }
            { isOpenConsole && <ConsoleDisplay /> }
            { isVisibleNodeControl && <Collapsible title="Node Control:" id={enumControlColumnElement.NodeControl}/> }
            { isOpenNodeControl && <NodeControl /> }
            { isVisibleElementStiffness && <Collapsible title="Element Stiffness Matrix:" id={enumControlColumnElement.ElementStiffness} /> }
            { isOpenElementStiffness && <ElementStiffness /> }        
            { isVisibleThreeControl && <Collapsible title="Three JS Controls:" id={enumControlColumnElement.ThreeControls} /> }
            {/* { isOpenThreeControl && <ThreeControl onSubmit={handleThreeSubmit}/> }         */}
            { isOpenThreeControl && <ThreeControl /> }        
            { isVisibleHWCreate && <Collapsible title="New Mesh Creation:" id={enumControlColumnElement.HWCreate} /> }
            {/* { isOpenHWCreate && <HWCreate  onSubmit={handleHWSubmit}/> } */}
            { isOpenHWCreate && <HWCreate /> }
        </div>
    )
}

export default ControlColumn

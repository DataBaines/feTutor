import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gaussPress as gaussPressAction, 
    globalPress as globalPressAction, 
    meshPress as meshPressAction,
    helpPress as helpPressAction,
    nodeMoveToggle as moveNodePressAction,
    nodeMesh3DToggle as mesh3DPressAction} from '../Actions/index'
import { IAppState } from '../Interfaces/IState'
import {generateMesh as generateMeshAction} from '../Actions/actionUpdateModel'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

const ButtonBar = (props) => {
  const handleMeshClick = () => dispatch(meshPressAction())
  const handleGaussClick = () => dispatch(gaussPressAction())
  const handleGlobalClick = () => dispatch(globalPressAction())
  const handleGenerateClick = () => thunkDispatch(generateMeshAction())
  const handleHelpClick = () => dispatch(helpPressAction())
  const handleMoveNodeClick = () => dispatch(moveNodePressAction(!moveNodeMode.on))
  const handleMesh3DClick = () => dispatch(mesh3DPressAction(!mesh3D.on))

  const {help, moveNodeMode, mesh3D, centreSectionContent} = useSelector((state: IAppState) => state.buttons)
  const {canGenerateMesh, canShowGauss, canShowGlobal, canShowMoveNode, canShowMesh3D} = useSelector((state: IAppState) => state.fe3Mesh.flags)
  const dispatch = useDispatch()
  const thunkDispatch: ThunkDispatch<IAppState, undefined, AnyAction> = useDispatch()
  
  return (
      <span className="buttonbar">
          {centreSectionContent != "mesh" && <button className="centretabsel" onClick={handleMeshClick} >Mesh</button>}
          {canShowGauss && centreSectionContent != "gauss" &&  <button className="centretabsel" onClick={handleGaussClick} >Gauss</button>}
          {canShowGlobal && centreSectionContent != "global" &&  <button className="centretabsel" onClick={handleGlobalClick} >Global Stiffness</button>}
          {canGenerateMesh && <button onClick={handleGenerateClick} >Generate New Mesh</button>}
          {help.visible && <button onClick={handleHelpClick} >Help!</button>}
          {canShowMoveNode && <button onClick={handleMoveNodeClick} >{moveNodeMode.on ? "Movable Nodes" : "Fixed Nodes"}</button>}
          {canShowMesh3D && <button onClick={handleMesh3DClick} >{mesh3D.on ? "Mesh 3D" : "Mesh Flat"}</button>}
      </span>
  )
}

export default ButtonBar
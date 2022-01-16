import React from 'react'
import { useSelector } from 'react-redux'
import { IAppState } from '../Interfaces/IState'

const StatusFooter = () => {

  const {stage, nodes} = useSelector((state: IAppState) => state.fe3Mesh)
  const selNode = useSelector((state: IAppState) => state.selNode)

  function getNode(){
    return nodes.find(n => n.id == selNode.nodeID)
  }

  let nodeInfo

  if (nodes && selNode && selNode.nodeID && selNode.nodeID >= 0) {
    nodeInfo = <span>Selected node:{selNode.nodeID}  x:{getNode().point1.x.toPrecision(2)}  y:{getNode().point1.y.toPrecision(2)}  value:{getNode().val.toPrecision(3)}</span>
  } else {
    nodeInfo = <span>No node selected</span>
  }

  return (
    <div className='statusfooter'>
      <span>
          Stage: {stage}
      </span>
      {nodeInfo}
    </div>
  )
}

export default StatusFooter
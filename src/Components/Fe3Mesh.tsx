import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ThreeEntryPoint from "./Threejs/ThreeEntryPoint";
import { IAppState } from "../Interfaces/IState";
import {
  addPerimeterNodes as addPerimeterNodesAction,
  nodeMove as nodeMoveAction,
  selectElementMiddleware as selectElementAction,
} from "../Actions/actionUpdateModel";
import {
  modelUpdateSuccess,
  nodeMesh3DToggle,
  nodeSelect as nodeSelectAction,
} from "../Actions/index";
import { ModelStateChangeProps } from "../Interfaces/Enums";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

let threeEntryPoint;

const Fe3Mesh = (props) => {
  const {
    componentProps,
    addPerimNodes,
    nodeSelect,
    elementSelect,
    addLogText,
    nodeMove,
  } = props;

  const {
    fe3Mesh,
    selNode,
    selElement,
    threeControl,
    moveNodeMode,
    newModelPending,
    mesh3D,
  } = componentProps;
  
  let ht = `You submitted:\n${JSON.stringify(componentProps, null, " ")}`;
  var myRef: HTMLDivElement;

  // const {fe3Mesh, selNode, selElement, threeControl} = useSelector((state: IAppState) => state)
  // const {mesh3D, moveNodeMode} = useSelector((state: IAppState) => state.buttons)
  // const {newModelPending} = useSelector((state: IAppState) => state.modelFlags)

  // const dispatch = useDispatch();
  const thunkDispatch: ThunkDispatch<IAppState, undefined, AnyAction> =
    useDispatch();

  //Run on didMount
  useEffect(() => {
    threeEntryPoint = ThreeEntryPoint(
      myRef,
      addNodeRequest,
      selectNode,
      selectElement,
      addLogEntry,
      moveNode,
      componentProps
    );
    //console.log("Fe3Mesh OnMount event")
  }, []);

  //Listen for changes in the model
  useEffect(() => {
    threeEntryPoint.onMeshChange(componentProps);
    console.log("Fe3Mesh mesh Prop changed:");
  }, [fe3Mesh, threeControl, mesh3D]);

  useEffect(() => {
    threeEntryPoint.onSelectedNodeChange(componentProps);
    console.log("Fe3Mesh selected node Prop change:");
  }, [selNode]);

  useEffect(() => {
    threeEntryPoint.onSelectedElementChange(componentProps);
    console.log("Fe3Mesh selected element Prop change:");
  }, [selElement]);

  useEffect(() => {
    threeEntryPoint.onMoveNodesChange(componentProps);
    console.log("Fe3Mesh movenodes mode Prop change:");
  }, [moveNodeMode]);

  useEffect(() => {
    console.log("Fe3Mesh new model pending spinner:");
  }, [newModelPending]);

  return (
    <div>
      {componentProps.modelFlags &&
        componentProps.modelFlags.newModelPending && <div className="loader" />}
      <div className="meshthree" ref={(element) => (myRef = element)} />
    </div>
  );

  //Functions to be called by the Three UI to update the model or State
  function addNodeRequest(axis: string, position: number) {
    //trigger a dispatch
    console.log("add node to linkbar axis:" + axis + " pos:" + position);
    //addPerimNodes(axis, position)
    //addPerimeterNodesAction(axis, position)
    thunkDispatch(addPerimeterNodesAction(axis, position));
  }

  function addLogEntry(text: string) {
    addLogText(text); // call the dispatch prop
  }

  function selectNode(nodeID: number) {
    //trigger a dispatch
    console.log("select node :" + nodeID);
    nodeSelect(nodeID); // call the dispatch prop
  }

  function selectElement(elementID: number) {
    //trigger a dispatch
    console.log("select element :" + elementID);
    //elementSelect(elementID) // call the dispatch prop
    thunkDispatch(selectElementAction(elementID));
  }

  function moveNode(nodeId: number, x: number, y: number) {
    //trigger a dispatch
    console.log(`move node : ${nodeId}`);
    //nodeMove(nodeId, x, y) // call the dispatch prop
    thunkDispatch(nodeMoveAction(nodeId, x, y));
  }
};

// Replaced by UseSelector
// Any changes in state that we want to refresh the object with
const mapStateToProps = (allState: IAppState) => {
  return {
    componentProps: {
      fe3Mesh: allState.fe3Mesh,
      selNode: allState.selNode,
      selElement: allState.selElement,
      threeControl: allState.threeControl,
      moveNodeMode: allState.buttons.moveNodeMode,
      newModelPending: allState.modelFlags.newModelPending,
      mesh3D: allState.buttons.mesh3D,
      // algebra: allState.algebraForm,
    },
  };
};

//The methods are there in props ready to be called
const mapDispatchToProps = (dispatch) => {
  return {
    //addPerimNodes: (axis, pos) => dispatch(addPerimeterNodesAction(axis, pos)),
    nodeSelect: (id) => dispatch(nodeSelectAction(id)),
    //elementSelect: id => dispatch(selectElementAction(id)),
    //nodeMove: (id, x, y) => dispatch(nodeMoveAction(id, x, y))
  };
};

// export default Fe3Mesh
export default connect(mapStateToProps, mapDispatchToProps)(Fe3Mesh);

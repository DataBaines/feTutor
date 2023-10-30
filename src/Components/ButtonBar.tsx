import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  gaussPress as gaussPressAction,
  globalPress as globalPressAction,
  meshPress as meshPressAction,
  helpPress as helpPressAction,
  nodeMoveToggle as moveNodePressAction,
  nodeMesh3DToggle as mesh3DPressAction,
} from "../Actions/index";
import { IAppState } from "../Interfaces/IState";
import { generateMesh as generateMeshAction } from "../Actions/actionUpdateModel";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import HelpIcon from "./HelpIcon";

const ButtonBar = () => {
  const handleMeshClick = () => dispatch(meshPressAction());
  const handleGaussClick = () => dispatch(gaussPressAction());
  const handleGlobalClick = () => dispatch(globalPressAction());
  const handleGenerateClick = () => thunkDispatch(generateMeshAction());
  const handleHelpClick = () => dispatch(helpPressAction());
  const handleMoveNodeClick = () =>
    dispatch(moveNodePressAction(!moveNodeMode.on));
  const handleMesh3DClick = () => dispatch(mesh3DPressAction(!mesh3D.on));

  const { help, moveNodeMode, mesh3D, centreSectionContent } = useSelector(
    (state: IAppState) => state.buttons
  );
  const {
    canGenerateMesh,
    canShowGauss,
    canShowGlobal,
    canShowMoveNode,
    canShowMesh3D,
  } = useSelector((state: IAppState) => state.fe3Mesh.flags);
  const dispatch = useDispatch();
  const thunkDispatch: ThunkDispatch<IAppState, undefined, AnyAction> =
    useDispatch();

  return (
    <div className="topnav">
      <button
        onClick={handleMeshClick}
        disabled={!canShowMesh3D}
        style={
          centreSectionContent == "mesh"
            ? { borderBottomColor: "red" }
            : { borderBottomColor: "transparent" }
        }
      >
        Mesh
      </button>

      <button
        onClick={handleGaussClick}
        disabled={!canShowGauss}
        style={
          centreSectionContent == "gauss"
            ? { borderBottomColor: "red" }
            : { borderBottomColor: "transparent" }
        }
      >
        Gauss
      </button>

      <button
        onClick={handleGlobalClick}
        disabled={!canShowGlobal}
        style={
          centreSectionContent == "global"
            ? { borderBottomColor: "red" }
            : { borderBottomColor: "transparent" }
        }
      >
        Global Stiffness
      </button>

      {canGenerateMesh && (
        <button onClick={handleGenerateClick}>Generate New Mesh</button>
      )}
      <span className="topchk">
        <label htmlFor="moveable">Moveable</label>
        <input
          type="checkbox"
          id="moveable"
          name="moveable"
          value="moveable"
          onChange={handleMoveNodeClick}
          checked={moveNodeMode.on}
          disabled={!moveNodeMode.visible}
        />
      </span>
      <span className="topchk">
        <label htmlFor="3d">3D View</label>
        <input
          type="checkbox"
          id="3d"
          name="3d"
          value="3d"
          onChange={handleMesh3DClick}
          checked={mesh3D.on}
          disabled={!mesh3D.visible}
        />
      </span>
    </div>
  );

  {
    /* return (
      <span className="buttonbar">
          {centreSectionContent != "mesh" && <button className="centretabsel" onClick={handleMeshClick} >Mesh</button>}
          {canShowGauss && centreSectionContent != "gauss" &&  <button className="centretabsel" onClick={handleGaussClick} >Gauss</button>}
          {canShowGlobal && centreSectionContent != "global" &&  <button className="centretabsel" onClick={handleGlobalClick} >Global Stiffness</button>}
          {canGenerateMesh && <button onClick={handleGenerateClick} >Generate New Mesh</button>}
          {help.visible && false && <button onClick={handleHelpClick} >Help!</button>}
          {canShowMoveNode && <button onClick={handleMoveNodeClick} >{moveNodeMode.on ? "Movable Nodes" : "Fixed Nodes"}</button>}
          {canShowMesh3D && <button onClick={handleMesh3DClick} >{mesh3D.on ? "Mesh 3D" : "Mesh Flat"}</button>}
      </span>
    ) */
  }
};

export default ButtonBar;

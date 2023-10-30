import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../Interfaces/IState";
import HelpIcon from "./HelpIcon";

const ElementStiffness = (props) => {
  const { dispatch } = props;
  const { elementID, stiffnessMatrix } = useSelector(
    (state: IAppState) => state.selElement
  );
  const sm = stiffnessMatrix;

  function ThreeSF(val1: number) {
    return Number(val1.toPrecision(3));
  }

  return (
    <div className="elemstiff">
      
      <p><HelpIcon id={2} />Element No.: {elementID}</p>
      <table className="elemstifftable">
        <thead>
          <tr>
            <th>Node</th>
            <th>{sm.node1.nodenumber}</th>
            <th>{sm.node2.nodenumber}</th>
            <th>{sm.node3.nodenumber}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{sm.node1.nodenumber}</th>
            <td>{ThreeSF(sm.node1.n1)}</td>
            <td>{ThreeSF(sm.node1.n2)}</td>
            <td>{ThreeSF(sm.node1.n3)}</td>
          </tr>
          <tr>
            <th>{sm.node2.nodenumber}</th>
            <td>{ThreeSF(sm.node2.n1)}</td>
            <td>{ThreeSF(sm.node2.n2)}</td>
            <td>{ThreeSF(sm.node2.n3)}</td>
          </tr>
          <tr>
            <th>{sm.node3.nodenumber}</th>
            <td>{ThreeSF(sm.node3.n1)}</td>
            <td>{ThreeSF(sm.node3.n2)}</td>
            <td>{ThreeSF(sm.node3.n3)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ElementStiffness;

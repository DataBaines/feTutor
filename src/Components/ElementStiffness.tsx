
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { IAppState } from '../Interfaces/IState'

const ElementStiffness = (props) => {
  const { dispatch } = props
  const {elementID, stiffnessMatrix} = useSelector((state: IAppState) => state.selElement)
  //const handleClick = () => props.generateClick()
  const sm = stiffnessMatrix

  function ThreeSF(val1: number) {
    return Number( val1.toPrecision(3) )
  }

  return (
    <div className="elemstiff">
      <p>Element: {elementID}</p>
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

// const mapStateToProps = (allState: IAppState) => {   
//     return{ 
//       gaussButtonProps: allState.buttons.gauss,
//     }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     //gaussPress: () => {dispatch(gaussPressAction())},
//     generateClick: () => {dispatch(generateMeshAction())},
//     //globalPress: () => {dispatch(globalPressAction())},
//     //helpPress: () => {dispatch(helpPressAction())},
//   }
// }

export default connect(
  null, 
  null
  )(ElementStiffness)

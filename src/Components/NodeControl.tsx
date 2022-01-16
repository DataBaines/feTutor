
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const NodeControl = (props) => {

  //const {gaussPress, generatePress, helpPress, globalPress, gaussButtonProps, generateButtonProps, helpButtonProps, globalButtonProps } = buttonsProps
  const { dispatch } = props

  //Run on didMount
  useEffect(() => {
      console.log("Buttons OnMount event")
    }, [])

  useEffect(() => {
      console.log("Buttons props change event")
    }, [props])

    const handleClick = () => props.generateClick()

    return (
        <div>
            <h1>Node Control</h1>
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
  )(NodeControl)

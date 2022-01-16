import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { gaussPress as gaussPressAction, 
    globalPress as globalPressAction, 
    helpPress as helpPressAction,
    loadAlgebra as loadAlgebraAction} from '../Actions/index'
import { setBoundary } from '../Actions/actionUpdateModel'
import AlgebraForm from './AlgebraForm'
import { IAppState } from 'src/Interfaces/IState'


const Algebra = (props) => {

    const { dispatch, canSubmitAlgebraProp } = props

    const handleClick = (values) => {
        // console.log(`Algebra: ${JSON.stringify(values)}`)
        dispatch(loadAlgebraAction(values))
        dispatch(setBoundary(values)) //TODO should I pass 'values' here or should I be submitting the redux State that was set in the line above?
    }

    return (
        <div>
            <AlgebraForm submitHandler={handleClick} enableSubmit={canSubmitAlgebraProp}/>
        </div> 
    )
}

const mapStateToProps = (allState: IAppState) => {   
    return{ 
      canSubmitAlgebraProp: allState.fe3Mesh.flags.canSubmitAlgebra,
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
  )(Algebra)
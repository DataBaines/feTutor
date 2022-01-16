import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {updateThreeSetup} from '../Actions/index'
import ThreeControlForm from './ThreeControlForm'
import { IAppState } from '../Interfaces/IState'


const ThreeControl = (props) => {
    return (
        <div className="threecontrolform">
            <ThreeControlForm submitHandler={props.submitClick} formValues={props.threeControlProps}/>
        </div> 
    )
}

const mapStateToProps = (allState: IAppState) => {   
    return{ 
      threeControlProps: allState.threeControl.content,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    submitClick: (values) => dispatch(updateThreeSetup(values))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(ThreeControl)
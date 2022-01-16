
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openComponent} from '../Actions/index'
import { IAppState, enumControlColumnElement } from '../Interfaces/IState'


const Collapsible = (props) => {

    const { handleToggle } = props
    //const handleClick = () => props.generateClick()

    // useEffect(() => {
    //     console.log("Collapsible OnMount event, id:" + props.id)
    //   }, [])
  
	return (
		<div>
			<div onClick={(e) => handleToggle(props.id)} className='collapheader' >
				{props.title} 
			</div>
    </div>
    )
}

const mapStateToProps = (state: IAppState, ownProps) => {   
    return{ 
      //opened: state.controlColumn.openControl,
      //id: state[ownProps.id].wrapper.id
    }
}

const mapDispatchToProps = dispatch => {
  return {
    handleToggle: (id: enumControlColumnElement) => dispatch( openComponent(id) ),
  }
}

export default connect(
  null,//mapStateToProps, 
  mapDispatchToProps
  )(Collapsible)


import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch, useSelector } from 'react-redux'
import { openComponent} from '../Actions/index'
import { IAppState, enumControlColumnElement } from '../Interfaces/IState'


const Collapsible = (props) => {

  const dispatch = useDispatch()

	return (
		<div>
			<div onClick={(e) => dispatch( openComponent(props.id))} className='collapheader' >
				{props.title} 
			</div>
    </div>
    )
}

export default Collapsible

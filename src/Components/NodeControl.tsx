
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


    return (
        <div>
            <h1>Node Control</h1>
        </div> 
    )
}

export default NodeControl

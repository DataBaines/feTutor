
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const ConsoleDisplay = (props) => {

  useEffect(() => {
      console.log("Buttons OnMount event")
    }, [])

  useEffect(() => {
      console.log("Buttons props change event")
    }, [props])

  return (
      <div>
          <h1>Console here!</h1>
      </div> 
  )
}

export default ConsoleDisplay

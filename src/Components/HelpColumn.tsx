import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openHelpSidebar} from '../Actions/index'
import { IAppState } from '../Interfaces/IState'
import HelpContent from './HelpContent'
import HelpLog from './HelpLog'


const HelpColumn = (props) => {

  const { dispatch } = props

  function handleClose(){
    dispatch(openHelpSidebar(false, 30))
  }

  function handleOpen(){
    dispatch(openHelpSidebar(true, 300))
  }

  //Run on didMount
  useEffect(() => {
      console.log("Help OnMount event")
    }, [])

  useEffect(() => {
      console.log("Help props change event")
    }, [props])

  const handleClick = () => props.generateClick()

  return (
      <div>
        {props.openHelp.isOpen === -1 ? (
          <div onClick={(e) => handleOpen()} className='helpclosed' >Help</div>
        ):
        (
          <div>
            <div onClick={(e) => handleClose()} className='helpopen' >Close</div>
            <HelpContent />
            {/* <HelpLog text={props.rollingLog.text} /> */}
          </div>
        )}

      </div> 
  )
  
}

const mapStateToProps = (allState: IAppState) => {   
  return{ 
      openHelp: allState.openHelp, 
  }
}

export default connect(
  mapStateToProps, 
  null
)(HelpColumn)
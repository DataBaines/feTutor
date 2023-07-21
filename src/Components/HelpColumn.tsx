import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { openHelpSidebar} from '../Actions/index'
import { IAppState } from '../Interfaces/IState'
import HelpContent from './HelpContent'
import HelpLog from './HelpLog'


const HelpColumn = (props) => {

  const { dispatch } = props
  const {isOpen} = useSelector((allState: IAppState) => allState.openHelp)
  
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

  return (
      <div>
        {isOpen === false ? (
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

export default HelpColumn
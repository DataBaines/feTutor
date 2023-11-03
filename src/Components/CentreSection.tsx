import React, {useEffect} from 'react'
import { connect, useSelector } from 'react-redux'
import { gaussPress as gaussPressAction, 
    globalPress as globalPressAction, 
    helpPress as helpPressAction} from '../Actions/index'
import { IAppState } from '../Interfaces/IState'
import Fe3Mesh from './Fe3Mesh'
import GaussGrid from './GaussGrid'
import GlobalGrid from './GlobalGrid'
import ButtonBar from './ButtonBar'
import StatusFooter from './StatusFooter'

const CentreSection = (props) => {

  const {centreSectionContent} = useSelector((state: IAppState) => state.buttons)

  return (
    <div className="centresectiondiv">
      <ButtonBar />    
      { centreSectionContent === "gauss" && <GaussGrid  /> }
      { centreSectionContent === "global" && <GlobalGrid  /> }
      { centreSectionContent === "mesh" && <Fe3Mesh /> }
      <StatusFooter />
    </div>
  )
  
}

export default CentreSection

import React, {useEffect} from 'react'

const HelpLog = (props) => {

  return (
    <div className='helpcontent'>
      <h1>Help log</h1>
      <p className='coordinates'>{props.text}</p>
    </div> 
  )
}

export default HelpLog
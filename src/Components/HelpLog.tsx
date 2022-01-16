
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { IAppState } from '../Interfaces/IState'


const HelpLog = (props) => {

  //const {gaussPress, generatePress, helpPress, globalPress, gaussButtonProps, generateButtonProps, helpButtonProps, globalButtonProps } = buttonsProps

  //Run on didMount
  // useEffect(() => {
  //     //console.log("Buttons OnMount event")
  //   }, [])

  // useEffect(() => {
  //     //console.log("Buttons props change event")
  //   }, [props])

  return (
    <div className='helpcontent'>
      <h1>Help log</h1>
      <p className='coordinates'>{props.text}</p>
    </div> 
  )
}

// const mapStateToProps = (allState: IAppState) => {   
//     return{ 
//       rollingLogProps: allState.rollingLog,
//     }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     generateClick: () => {dispatch(generateMeshAction())},
//   }
// }

// export default connect(
//   mapStateToProps, 
//   null
//   )(HelpLog)
export default HelpLog
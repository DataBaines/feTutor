
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const HelpContent = (props) => {

  //const {gaussPress, generatePress, helpPress, globalPress, gaussButtonProps, generateButtonProps, helpButtonProps, globalButtonProps } = buttonsProps
  const { dispatch } = props

  //Run on didMount
  useEffect(() => {
      //console.log("Buttons OnMount event")
    }, [])

  useEffect(() => {
      //console.log("Buttons props change event")
    }, [props])

    return (
        <div className='helpcontent'>
            <h1>HelpContent!</h1>
            <p>Here we are going to add some help content to the page</p>
            <p>And some more</p>
        </div> 
    )
  
}

// const mapStateToProps = (allState: IAppState) => {   
//     return{ 
//       gaussButtonProps: allState.buttons.gauss,
//     }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     generateClick: () => {dispatch(generateMeshAction())},
//   }
// }

export default connect(
  null, 
  null
  )(HelpContent)

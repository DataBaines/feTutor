import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
// import { Form, Field } from 'react-final-form'

import { composeValidators, required, mustBeNumber, maxValue, minValue, parseDecimal } from './Validate'

//Brought from Redux via props instead
// const initData = {
//   // used to populate reducer when "Load" is clicked
//   renderScale: 1,
//   linkbarRadius: 6,
//   nodeRadius: 12,
//   elementDepth: 1,
// }

const renderfield = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
      <div>
          <input {...input} placeholder={label} type={type}/>
          {touched && ((error && <div className="inputError">{error}</div>) || (warning && <div className="inputWarning">{warning}</div>))}
      </div>
  )
}

const rendercolourfield = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <div className="inputError">{error}</div>) || (warning && <div className="inputWarning">{warning}</div>))}
        </div>
    )
}

let ZThreeControlForm2 = (props) => {
    const initialValues = props.formValues
    return(      
    // <Form
    //     initialValues={props.formValues}
    //     onSubmit={props.submitHandler}
    //     > 
        
        // ({ handleSubmit, submitting, values }) => (
            <form onSubmit={(values) => props.submitHandler(values)} >
                <div>
                    <label>Render scale:</label>
                    <input placeholder="Render Scale" id="renderScale" name="renderScale" type="number" />
                    <label>linkbar Radius:</label>
                    <input placeholder="linkbar Radius" id="linkbarRadius" name="linkbarRadius" type="number" />
                    <label>node Radius:</label>
                    <input placeholder="node Radius" id="nodeRadius" name="nodeRadius" type="number" />
                    <label>element Depth :</label>
                    <input placeholder="element Depth" id="elementDepth" name="elementDepth" type="number" />
                    {/* <Field 
                        name="renderScale" 
                        component={renderfield} 
                        step="0.1" 
                        type="number" 
                        label="Render Scale" 
                        validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                        parse={value => parseDecimal(value)} /> */}


                    <label>Node Colour:</label>
                    <input placeholder="Render Scale" id="nodeColour" name="nodeColour" type="color" />
                    {/* <Field 
                        name="nodeColour" 
                        component={rendercolourfield} 
                        step="1" 
                        type="color" 
                        label="Node Colour" 
                        validate={composeValidators(required, mustBeNumber)} 
                        parse={value => parseDecimal(value)} /> */}
                </div>

                <button type="submit" >Submit</button>
                {/* <pre>{ JSON.stringify(values, undefined, 2) }</pre> */}
            </form>
        // )
    // </Form>
  )
}

export default ZThreeControlForm2
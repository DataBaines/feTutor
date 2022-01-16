import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'

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
  const style = {}
  return (
      <span>
          <input {...input} placeholder={label} type={type}/>
          {touched && ((error && <div className="inputError">{error}</div>) || (warning && <div className="inputWarning">{warning}</div>))}
      </span>
  )
}


let ThreeControlForm = (props) => {
    return(      
    <Form
        initialValues={props.formValues}
        onSubmit={props.submitHandler}
        > 
        
        {({ handleSubmit, submitting, values }) => (
            <form onSubmit={(values) => handleSubmit(values)} >
                <div id="threecontrols">
                    <label>Render scale:</label>
                    <Field 
                        name="renderScale" 
                        component={renderfield} 
                        step="0.1" 
                        type="number" 
                        label="Render Scale" 
                        validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                        parse={value => parseDecimal(value)} />
                    <label>Linkbar Radius:</label>
                    <Field 
                        name="linkbarRadius" 
                        component={renderfield} 
                        step="1" 
                        type="number" 
                        label="Linkbar Radius" 
                        validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(0))} 
                        parse={value => parseDecimal(value)} />
                    <label>Node Radius:</label>
                    <Field 
                        name="nodeRadius" 
                        component={renderfield} 
                        step="1" 
                        type="number" 
                        label="Node Radius" 
                        validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(0))} 
                        parse={value => parseDecimal(value)} />
                    <label>Element Depth:</label>
                    <Field 
                        name="elementDepth" 
                        component={renderfield} 
                        step="1" 
                        type="number" 
                        label="Element Depth" 
                        validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(0))} 
                        parse={value => parseDecimal(value)} />
                    <br></br>
                    <label>Node Colour:</label>
                    <Field name="nodeColour">
                        {props => ( <input {...props.input} type="color" />  )}
                    </Field>
                    <br></br>
                    <label>Node Colour Selected:</label>
                    <Field name="nodeColourSelected">
                        {props => ( <input {...props.input} type="color" />  )}
                    </Field>
                    <br></br>
                    <label>Node Colour Moveable:</label>
                    <Field name="nodeColourMoveable">
                        {props => ( <input {...props.input} type="color" />  )}
                    </Field>
                    <br></br>                    
                    <label>Element Colour:</label>
                    <Field name="elementColour">
                        {props => ( <input {...props.input} type="color" />  )}
                    </Field>
                    <br></br>
                    <label>Element Colour Selected:</label>
                    <Field name="elementColourSelected">
                        {props => ( <input {...props.input} type="color" />  )}
                    </Field>
                    <br></br>
                    <label>Linkbar Colour:</label>
                    <Field name="linkbarColour">
                        {props => ( <input {...props.input} type="color" />  )}
                   </Field>
                </div>

                <button type="submit" disabled={submitting}>Submit</button>
                {/* <pre>{ JSON.stringify(values, undefined, 2) }</pre> */}
            </form>
        )}
    </Form>
  )
}

export default ThreeControlForm
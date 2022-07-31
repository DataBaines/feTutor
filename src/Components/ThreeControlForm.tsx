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
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Render scale:</label>
                    </div>
                    <div className="row-rh">
                        <Field 
                            name="renderScale" 
                            component={renderfield} 
                            step="0.1" 
                            type="number" 
                            label="Render Scale" 
                            validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                            parse={value => parseDecimal(value)} />
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Linkbar Radius:</label>
                    </div>
                    <div className="row-rh">
                        <Field 
                            name="linkbarRadius" 
                            component={renderfield} 
                            step="1" 
                            type="number" 
                            label="Linkbar Radius" 
                            validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(0))} 
                            parse={value => parseDecimal(value)} />
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Node Radius:</label>
                    </div>
                    <div className="row-rh">
                        <Field 
                            name="nodeRadius" 
                            component={renderfield} 
                            step="1" 
                            type="number" 
                            label="Node Radius" 
                            validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(0))} 
                            parse={value => parseDecimal(value)} />
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Element Depth:</label>
                    </div>
                    <div className="row-rh">
                        <Field 
                            name="elementDepth" 
                            component={renderfield} 
                            step="1" 
                            type="number" 
                            label="Element Depth" 
                            validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(0))} 
                            parse={value => parseDecimal(value)} />
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Node Colour:</label>
                    </div>
                    <div className="row-rh">
                        <Field name="nodeColour">
                            {props => ( <input {...props.input} type="color" />  )}
                        </Field>
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Node Colour Selected:</label>
                    </div>
                    <div className="row-rh">
                        <Field name="nodeColourSelected">
                            {props => ( <input {...props.input} type="color" />  )}
                        </Field>
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Node Colour Moveable:</label>
                    </div>
                    <div className="row-rh">
                        <Field name="nodeColourMoveable">
                            {props => ( <input {...props.input} type="color" />  )}
                        </Field>
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Element Colour:</label>
                    </div>
                    <div className="row-rh">
                        <Field name="elementColour">
                            {props => ( <input {...props.input} type="color" />  )}
                        </Field>
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        <label>Element Colour Selected:</label>
                    </div>
                    <div className="row-rh">
                        <Field name="elementColourSelected">
                            {props => ( <input {...props.input} type="color" />  )}
                        </Field>
                    </div>
                </div>
                <div className='siderow'>
                    <div className="row-lh">
                        {/* <br></br> */}
                        <label>Linkbar Colour:</label>
                    </div>
                    <div className="row-rh">
                        <Field name="linkbarColour">
                            {props => ( <input {...props.input} type="color" />  )}
                        </Field>
                    </div>
                </div>

                <div className='siderow'>
                    <button type="submit" disabled={submitting}>Submit</button>
                    {/* <pre>{ JSON.stringify(values, undefined, 2) }</pre> */}
                </div>
            </form>
        )}
    </Form>
  )
}

export default ThreeControlForm
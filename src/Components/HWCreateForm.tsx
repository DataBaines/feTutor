import React from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
//import { Field, reduxForm } from 'redux-form' //moved to final 
import { Form, Field } from 'react-final-form'
import {  required, minValue, composeValidators, parseDecimal, maxValue, mustBeNumber } from './Validate'


const initData = {
    // used to populate reducer when "Load" is clicked
    height: 1,
    width: 1
}

const handleSub = (values) => {
    console.log(values.height, values.width)
}

const renderfield = ({ input, label, type, meta: { touched, error, warning } }) => {
    const style = {}
    return (
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
        </div>
    )
}

const HWCreateForm = props => {
    return(    
        <Form
            initialValues={initData}
            onSubmit={props.submitHandler}
            > 
             
            {({ handleSubmit, submitting, values }) => (

                <form onSubmit={handleSubmit}
                    >
                    <div>
                        <label>Height</label>
                        <Field 
                            name="height" 
                            component={renderfield} 
                            type="number" 
                            label="Height" 
                            validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                            parse={value => parseDecimal(value)} />
                    </div>
                    <div>
                        <label>Width</label>
                        <Field 
                            name="width" 
                            component={renderfield} 
                            type="number" 
                            label="Width" 
                            validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                            parse={value => parseDecimal(value)} />
                    </div>        
                    <button type="submit" disabled={submitting}>Submit</button>
                    {/* <pre>{ JSON.stringify(values, undefined, 2) }</pre> */}
                </form>
            )}
        </Form>
    )
}

export default HWCreateForm

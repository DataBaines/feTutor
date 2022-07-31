import React, {useEffect} from 'react'
import { Field, Form } from 'react-final-form'
import {  required, minValue, composeValidators, parseDecimal, maxValue, mustBeNumber } from './Validate'

const initData = {
    // used to populate reducer when "Load" is clicked
    xaxis: 5,
    yaxis: 5
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

const MultipleNodes = (props) => {

    // const {stage} = useSelector((state: IAppState) => state.fe3Mesh)
    // const dispatch = useDispatch()
  
    // const { dispatch } = props
    // const handleClick = (values) => dispatch(newModel(values.height, values.width))
    const handleSubmit = props.submitHandler

    return (
        <div className="formcontainer">
            <Form initialValues={initData} onSubmit={props.submitHandler}> 
            {({ handleSubmit, submitting, values }) => (

                <form onSubmit={handleSubmit}>
                    <p>Divide the mesh into sections</p>
                    <div className='siderow'>
                        <div className="row-lh">
                            <label>X Axis</label>
                        </div>
                        <div className="row-rh">
                            <Field 
                                name="xaxis" 
                                component={renderfield} 
                                type="number" 
                                label="X Axis section count" 
                                validate={composeValidators(required, mustBeNumber, maxValue(10), minValue(3))} 
                                parse={value => parseDecimal(value)} />
                        </div>
                    </div>
                    <div className='siderow'>
                        <div className="row-lh">
                            <label>Y Axis</label>
                        </div>
                        <div className="row-rh">
                            <Field 
                                name="yaxis" 
                                component={renderfield} 
                                type="number" 
                                label="Y axis section count" 
                                validate={composeValidators(required, mustBeNumber, maxValue(10), minValue(3))} 
                                parse={value => parseDecimal(value)} />
                        </div>        
                    </div>
                    <div className='siderow'>
                        <button type="submit" disabled={submitting}>Submit</button>
                        {/* <pre>{ JSON.stringify(values, undefined, 2) }</pre> */}
                    </div>
                </form>
            )}
        </Form>
    </div>

    )
}

export default MultipleNodes
// export default connect(
//   null, 
//   null
//   )(HWCreate)
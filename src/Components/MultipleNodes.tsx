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

        <Form
        initialValues={initData}
        onSubmit={props.submitHandler}
        > 
         
        {({ handleSubmit, submitting, values }) => (

            <form onSubmit={handleSubmit}>
                <p>Divide the mesh into sections</p>
                <div>
                    <label>X Axis</label>
                    <Field 
                        name="xaxis" 
                        component={renderfield} 
                        type="number" 
                        label="X Axis section count" 
                        validate={composeValidators(required, mustBeNumber, maxValue(10), minValue(3))} 
                        parse={value => parseDecimal(value)} />
                </div>
                <div>
                    <label>Y Axis</label>
                    <Field 
                        name="yaxis" 
                        component={renderfield} 
                        type="number" 
                        label="Y axis section count" 
                        validate={composeValidators(required, mustBeNumber, maxValue(10), minValue(3))} 
                        parse={value => parseDecimal(value)} />
                </div>        
                <button type="submit" disabled={submitting}>Submit</button>
                {/* <pre>{ JSON.stringify(values, undefined, 2) }</pre> */}
            </form>
        )}
    </Form>

        // <form onSubmit={handleSubmit}>
        //     <div>
        //         <label htmlFor="xnodeqty">X Node Quantity (Incl. corners):</label>
        //         <input type="number" id="xnodeqty" name="xnodeqty" min="3" max="10" />
        //     </div> 
        //     <div>
        //         <label htmlFor="ynodeqty">Y Node Quantity (Incl. corners):</label>
        //         <input type="number" id="ynodeqty" name="ynodeqty" min="3" max="10" />
        //     </div> 
        //     <input type="submit"/>
        // </form>
    )
}

export default MultipleNodes
// export default connect(
//   null, 
//   null
//   )(HWCreate)
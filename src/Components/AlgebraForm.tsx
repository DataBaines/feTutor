import React from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { isaNumber} from './FieldLevelValidation'
import {composeValidators, minValue, maxValue, parseDecimal, requiredNumber as required, mustBeNumber} from './Validate'

const initData = {
  // used to populate reducer when "Load" is clicked
  topax2: 0,  topbx: 1,  topc: 0.5,
  rhax2: 0,  rhbx: 0.5,  rhc: 1,
  botax2: 1,  botbx: 0,  botc: 0,
  lhax2: 0.5,  lhbx: 0,  lhc: 0,
//   topax2: 0,  topbx: 0,  topc: 0,
//   rhax2: 0,  rhbx: 0,  rhc: 0,
//   botax2: 0,  botbx: 0,  botc: 0,
//   lhax2: 0,  lhbx: 0,  lhc: 0,
}

const renderfield = ({ input, label, type, meta: { touched, error, warning } }) => {
    const style = {}
    return (
        <div >
            <input  {...input} className={'alginputfield'} placeholder={label} type={'text'}/>
            {touched && ((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
        </div>
    )
}

const AlgebraForm = props => {

    return(    
        <Form
            initialValues={initData}
            onSubmit={props.submitHandler}
        >
          {({ handleSubmit, pristine, form, submitting }) => (   
            <form onSubmit={handleSubmit}>
                <h2>Axis Algebra Formulas</h2>
                {/* <div>
                    <button type="button" onClick={() => load(initData)}>
                    Load Default Data
                    </button>
                </div> */}
                <table className={'algtable'}>
                    <tbody className={'algtbody'}>
                        <tr>
                            <td className={'alglabel'}>
                                <label>ax2</label>
                            </td>
                            <td className={'alglabel'}>
                                <label>bx</label>
                            </td>
                            <td className={'alglabel'}>
                                <label>c</label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>Top:</td>
                        </tr>
                        <tr>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="topax2" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="ax2" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="topbx" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="bx" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputright'} valign='top'>
                                <Field 
                                    name="topc" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="c" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>Right:</td>
                        </tr>
                        <tr>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="rhax2" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="ax2" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="rhbx" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="bx" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputright'} valign='top'>
                                <Field 
                                    name="rhc" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="c" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>Bottom:</td>
                        </tr>
                        <tr>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="botax2" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="ax2" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="botbx" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))}
                                    label="bx" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputright'} valign='top'>
                                <Field 
                                    name="botc" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="c" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>Left:</td>
                        </tr>
                        <tr>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="lhax2" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="ax2" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputleft'} valign='top'>
                                <Field 
                                    name="lhbx" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="bx" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                            <td className={'alginputright'} valign='top'>
                                <Field 
                                    name="lhc" 
                                    component={renderfield} 
                                    validate={composeValidators(required, mustBeNumber, maxValue(1000), minValue(-1000))} 
                                    label="c" 
                                    parse={value => parseDecimal(value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button type="submit" disabled={submitting || !props.enableSubmit}>
                        Submit
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={form.reset}>
                        Undo Changes
                    </button>
                </div>
            </form>   
        )}
        </Form>
    )
}

export default AlgebraForm



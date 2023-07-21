import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateThreeSetup} from '../Actions/index'
import ThreeControlForm from './ThreeControlForm'
import { IAppState } from '../Interfaces/IState'


const ThreeControl = (props) => {
    const content = useSelector((state: IAppState) => state.threeControl.content)
    const dispatch = useDispatch()
    return (
        <div className="formcontainer">
            {/* <ThreeControlForm submitHandler={props.submitClick} formValues={content}/> */}
            <ThreeControlForm submitHandler={(values) => dispatch(updateThreeSetup(values))} formValues={content}/>
        </div> 
    )
}

export default ThreeControl  
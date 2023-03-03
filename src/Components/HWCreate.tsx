import React, {useEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../Interfaces/IState'
import {newModel, addMultiplePerimeterNodes} from '../Actions/actionUpdateModel'
import HWCreateForm from './HWCreateForm'
import MultipleNodes from './MultipleNodes'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux'

const HWCreate = (props) => {

    const {stage, nodes} = useSelector((state: IAppState) => state.fe3Mesh)
    const thunkDispatch: ThunkDispatch<IAppState, undefined, AnyAction> = useDispatch()

    const handleCreate = (values) => {
        const fun = newModel(values.height, values.width)
        console.log(`thunk new ` + fun)
        thunkDispatch(fun)
    }
    const handleMultipleNodeCreate = (values) => {
        const fun = addMultiplePerimeterNodes(values.xaxis, values.yaxis)
        console.log(`thunk multipe ` + fun)
        thunkDispatch(fun)
    }
 
    let enableMultipleNodeAddition = stage == 1 && nodes && nodes.length <= 4

    return (
        <div>
            <HWCreateForm submitHandler={handleCreate}/>
            {stage == 1 && nodes && nodes.length <= 4 && <MultipleNodes submitHandler={handleMultipleNodeCreate}/>}
        </div> 
    )
}

export default HWCreate
// export default connect(
//   null, 
//   null
//   )(HWCreate)
import React, {useEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../Interfaces/IState'
import {newModel, addMultiplePerimeterNodes} from '../Actions/actionUpdateModel'
import HWCreateForm from './HWCreateForm'
import MultipleNodes from './MultipleNodes'


const HWCreate = (props) => {

    const {stage, nodes} = useSelector((state: IAppState) => state.fe3Mesh)
    const dispatch = useDispatch()
  
    const handleCreate = (values) => dispatch(newModel(values.height, values.width))
    const handleMultipleNodeCreate = (values) => dispatch(addMultiplePerimeterNodes(values.xaxis, values.yaxis))

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
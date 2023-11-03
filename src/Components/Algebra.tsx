import React, {useEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { loadAlgebra as loadAlgebraAction} from '../Actions/index'
import { setBoundary } from '../Actions/actionUpdateModel'
import AlgebraForm from './AlgebraForm'
import { IAppState } from 'src/Interfaces/IState'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'


const Algebra = () => {

    const {canSubmitAlgebra} = useSelector((state: IAppState) => state.fe3Mesh.flags)
    const thunkDispatch: ThunkDispatch<IAppState, undefined, AnyAction> = useDispatch()
    const dispatch = useDispatch()

    const handleClick = (values) => {
        // console.log(`Algebra: ${JSON.stringify(values)}`)
        dispatch(loadAlgebraAction(values))
        thunkDispatch(setBoundary(values)) //TODO should I pass 'values' here or should I be submitting the redux State that was set in the line above?
    }

    return (
        <div>
            <AlgebraForm submitHandler={handleClick} enableSubmit={canSubmitAlgebra}/>
        </div> 
    )
}

export default Algebra
import { elementSelect, modelUpdateSuccess, openComponent, remodelPending} from './index';
import FeInterface from '../FeModel/feInterface'
import { enumControlColumnElement, IBoundaryParams, IFe3SelElement } from '../Interfaces/IState';

let feInterface = FeInterface();
// from https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao

const delay = ms => new Promise(res => setTimeout(res, ms));

export function selectElementMiddleware(elementID: number) {
    return dispatch => {
        const stiffnessObj = feInterface.GetElementStiffness(elementID)
        console.log("Stiff1:" + JSON.stringify(stiffnessObj))
        dispatch(elementSelect(stiffnessObj))
        dispatch(openComponent(enumControlColumnElement.ElementStiffness))
    }
}

// Write a synchronous outer function that receives the `dimensions` parameters:
export function newModel(height: number, width: number) {
  // And then creates and returns the async thunk function:
  return async function thunkfunc(dispatch) {
        dispatch(remodelPending(true));
        console.log("thunkfunc1:" )
        //await delay(500) //Display the spinner...
        await feInterface.CreateNewMeshNotUsed(height, width)
        console.log("thunkfunc2:" )
        const latestModel = combineModelComponents()
        dispatch(modelUpdateSuccess(latestModel))
        dispatch(remodelPending(false));
        //return latestModel
    }
}

export function addPerimeterNodes(axis: string, pos: number) {
    return async dispatch => {
        dispatch(remodelPending(true));
        await feInterface.CreatePerimeterNodes1(axis, pos)
        const latestModel = combineModelComponents()
        dispatch(modelUpdateSuccess(latestModel))
        dispatch(remodelPending(false));
        //return latestModel
    }
}

export function addMultiplePerimeterNodes(xQty: number, yQty: number) {
    return async dispatch => {
        dispatch(remodelPending(true));
        await feInterface.CreateMultiplePerimeterNodes(xQty, yQty)
        const latestModel = combineModelComponents()
        dispatch(modelUpdateSuccess(latestModel))
        dispatch(remodelPending(false));
        //return latestModel
    }
}

export function generateMesh() {
    return async dispatch => {
        dispatch(remodelPending(true));
        //await delay(300) 
        await feInterface.GenerateMesh1()
        console.log("mesh generated")
        const latestModel = combineModelComponents()
        dispatch(modelUpdateSuccess(latestModel))
        dispatch(openComponent(enumControlColumnElement.Algebra))
        dispatch(remodelPending(false));
        //return latestModel
    }
}

export function setBoundary(boundaryParams: IBoundaryParams) {
    return async dispatch => {
        //Change the model
        dispatch(remodelPending(true));
        await feInterface.SetBoundary(boundaryParams)
        //get the new model shape
        const latestModel = combineModelComponents()
        //update the Redux store with it
        dispatch(modelUpdateSuccess(latestModel))
        dispatch(openComponent(enumControlColumnElement.Console))
        dispatch(remodelPending(false));
        // return latestModel // Don't think I need to return anything
    }
}

export function nodeMove (id: number, x: number, y: number) {
    return async dispatch => {
        dispatch(remodelPending(true));
        await feInterface.MoveNode1(id, x, y)
        const latestModel = combineModelComponents()
        dispatch(modelUpdateSuccess(latestModel))

        const selectedEl = feInterface.GetSelecteElement()
        if(selectedEl>0)
        {
            const stiffnessObj = feInterface.GetElementStiffness(selectedEl)
            dispatch(elementSelect(stiffnessObj))
        }
        dispatch(remodelPending(false));

    }
}

function combineModelComponents(){
    const tr = feInterface.GetTRNode()

    const retObj = {
        nodes: feInterface.GetThreeNodes(), 
        linkbars: feInterface.GetThreeLinkbars(), 
        elements: feInterface.GetThreeElements(),
        globalStiffness: feInterface.GetThreeGlobalStiffness(),
        gauss: feInterface.GetThreeGauss(),
        height: tr.getY(),
        width: tr.getX(),
        stage: feInterface.GetStage()
    }
    return retObj
}
//export default fetchProducts;
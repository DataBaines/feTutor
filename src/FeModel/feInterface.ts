import { FeMesh } from './feMesh';
import { IBoundaryParams } from '../Interfaces/IState';


const FeInterface = () => {
    let femesh: FeMesh = null
    let nodeVal = 0

    return{
        CreateNewMeshNotUsed: function(height: number, width: number){
            femesh = new FeMesh(width, height)
        },
    
        CreateNewMesh1: async function (height: number, width: number) {
            let myPromise = new Promise(function(myResolve, myReject) {
                console.log("Call New FeMesh!");
                femesh = new FeMesh(width, height)

                myResolve("OK");
            });
            return myPromise
        },

        GenerateMesh1: async function () {
            let myPromise = new Promise(function(myResolve, myReject) {
                console.log("Generate FeMesh!");
                femesh.generateMesh()

                myResolve("OK");
            });
            return myPromise
        },

        SetBoundary: function (b: IBoundaryParams){
            let myPromise = new Promise(function(myResolve, myReject) {
                femesh.setBoundary(b) 
                myResolve("OK");
            });
            return myPromise
        },

        CreatePerimeterNodes1: async function (axis: string, pos: number) {
            let myPromise = new Promise(function(myResolve, myReject) {
                femesh.createPerimeterNodes(axis, pos)
                myResolve("OK");
            });
            return myPromise
        },
 
        CreateMultiplePerimeterNodes: async function (xQty: number, yQty: number) {
            let myPromise = new Promise(function(myResolve, myReject) {
                femesh.createMultiplePerimeterNodes(xQty, yQty)
                myResolve("OK");
            });
            return myPromise
        },
         
        MoveNode1: async function (nodeID: number, x: number, y: number) {
            let myPromise = new Promise(function(myResolve, myReject) {
                femesh.moveInnerNode(nodeID, x, y)
                myResolve("OK");
            });
            return myPromise
        },
        
        CalcElementQty: function(){
            femesh.calcElementQty()
        },

        CalcNodeQty: function (){
            femesh.calcNodeQty()
        },

        ResetInnerNodeValues: function (){
            femesh.resetInnerNodeValues()
        },

        CreateGlobalStiffness: function (){
            femesh.globalStiffness()
        },

        GetMaxMinNodeValue: function (isMax: boolean){
            nodeVal = femesh.getMaxMinNodeValue(isMax)
        },

        GetNodes: function (){
            return femesh.nodes
        },

        GetThreeNodes: function (){
            return femesh.getThreeNodes()
        },

        GetThreeElements: function (){
            return femesh.getThreeElements()
        },

        GetThreeLinkbars: function (){
            return femesh.getThreeLinkbars()
        },

        GetThreeGlobalStiffness: function (){
            return femesh.GetThreeGlobalStiffness()
        },

        GetThreeGauss: function (){
            return femesh.GetThreeGauss()
        },

        GetBLNode: function (){
            return femesh.nodeBL
        },

        GetTLNode: function (){
            return femesh.nodeTL
        },

        GetBRNode: function (){
            return femesh.nodeBR
        },

        GetTRNode: function (){
            return femesh.nodeTR
        },

        GetStage: function (){
            return femesh.getStage()
        },

        GetElementStiffness: function (elementID: number){
            return femesh.getThreeElementStiffness(elementID)
        },

        GetSelecteElement: function (){
            return femesh.getSelEl()
        },

        // CreatePerimeterNodes: function (axis: string, pos: number){
        //     return new Promise(femesh.createPerimeterNodes(axis, pos))
        // },

        // MoveNode: function (nodeID: number, x: number, y: number){
        //     return new Promise(femesh.moveInnerNode(nodeID, x, y))
        // },

    }
}

export default FeInterface
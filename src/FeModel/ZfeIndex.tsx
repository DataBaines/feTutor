import React, { useState } from 'react'
import { FeNode } from './feNode'
import { FeMesh } from './feMesh';
import { connect } from 'react-redux';
import { IAppState, IFe3NodeState, IFe3MeshState } from 'src/Interfaces/IState';
//import { createNewMesh } from 'src/Actions';

//const FeIndex = () => {
const FeIndex = (props) => {
    const {nodes, triangles, linkBars} = props
    
    // const [nodeX, setNodeX] = useState(1);
   
    // let n = new FeNode(23, 19)
    // let x = n.posX //getX()
    // let y = n.getY()
    // this.setState({nodeX: x})
    // this.setState({nodeY: y})
    // this.setState({nodeObj: n})

    let nodeVal = 0
    let femesh = null

    // return{
    //     CreateNewMesh: function(height: number, width: number){
    //         femesh = new FeMesh(width, height)
    //     },
    
    //     GenerateMesh: function(){
    //         femesh.generateMesh() 
    //     },

    //     CalcElementQty: function(){
    //         femesh.calcElementQty()
    //     },

    //     CalcNodeQty: function (){
    //         femesh.calcNodeQty()
    //     },

    //     CreatePerimeterNodes: function (axis: string, pos: number){
    //         femesh.createPerimeterNodes(axis, pos)
    //     },

    //     ResetInnerNodeValues: function (){
    //         femesh.resetInnerNodeValues()
    //     },

    //     CreateGlobalStiffness: function (){
    //         femesh.globalStiffness()
    //     },

    //     GetMaxMinNodeValue: function (isMax: boolean){
    //         nodeVal = femesh.getMaxMinNodeValue(isMax)
    //     },

    //     SetBoundary: function (b: number[]){
    //         femesh.setBoundary(b)
    //     },

    //     GetNodes: function (){
    //         return femesh.nodes
    //     }
    // }
    //TODO do we need this
    return(       
        <div className="contentright">
            <h2>FeElement Component</h2>
        </div>
    )
    
}

const mapStateToProps = (state: IAppState) => {   
    return{ 
        nodes: state.fe3Mesh.nodes,
        linkBars: state.fe3Mesh.linkBars,
        elements: state.fe3Mesh.elements
    }
}

//export default connect(mapStateToProps)(FeIndex)
//export default FeIndex
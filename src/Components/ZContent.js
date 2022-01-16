import React from 'react'
import {FeNode} from '../FeModel/feNode'
import { FeMesh } from '../FeModel/feMesh'
import StatusCard from '../ZExtras/ToggleButtonTest'
import ContentLeft from './ZContentLeft'
import ContentRight from './ZContentRight'

class Content extends React.Component{
    constructor(){
        super()
        this.state = {
            nodeX:3,
            nodeY:2,
            nodObj:{}
        }
    }

    componentDidMount() {
        let n = new FeNode(23, 19)
        let x = n.posX //getX()
        let y = n.getY()
        this.setState({nodeX: x})
        this.setState({nodeY: y})
        this.setState({nodeObj: n})
    }

    render(){
        const x = this.state.nodeX
        const y = this.state.nodeY
        //const n = this.setState.nodeObj
        return(
            <div>
                <h1>Content section Start</h1>
                <p>Value of x: {x}</p>
                <p>Value of y: {y}</p>
                <h1>Content End</h1>
                <StatusCard />
                <table id="tablecontent">

                    <tbody>
                        <tr>
                            <td>
                                <ContentLeft/>
                            </td>
                            <td>
                                <ContentRight/>
                            </td>
                        </tr>
                    </tbody>
                </table> 

            </div>
        )
    }
}

export default Content
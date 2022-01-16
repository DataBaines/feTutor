import React, { AnchorHTMLAttributes } from 'react'
import { Side } from 'three';


const ThreeContainer: React.FC<{ CloseHandler: ()=>void; }>
= (props) => { 
    
    return(
        <div id="myThreeBox" className="threebox">

        </div>
    )
}

export default ThreeContainer
import React, { AnchorHTMLAttributes } from 'react'
//import SidebarAlgebraRow from './ZSidebarAlgebraRow'
import axes from '../axes'
import { Side } from 'three';
import Algebra from './Algebra';

//needs mending!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export type SideBarProps = {
    CloseHandler: ()=>void
}

const SidebarAlgebra: React.FC<{ CloseHandler: ()=>void; }>
= (props) => { 
//    const axisComponents = axes.map(item => <SidebarAlgebraRow key={item.id} defaultvalues={item} />)
    
    return(
        <div id="mySidenav" className="sidenav">
            <a href="#!" className="closebtn" onClick={clickFn}>&times;</a>
            {/* <form>
                <table id="tab1">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="tabletitle">Title</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {axisComponents}
                    </tbody>
                </table> 
            </form> */}

            <Algebra/>
        </div>
    )
    
    function clickFn(){
        props.CloseHandler();
    }
}

export default SidebarAlgebra

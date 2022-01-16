import React from 'react'
//import {axisdata} from './SidebarAlgebra'

type axisdata = {id: string, side: string, ax2: number, bx: number, c:number};

const SidebarAlgebraRow: React.FC<{ defaultvalues: axisdata; }>
= (props) => { 
    return(   
            <tr className="tableDat">
                <td>{props.defaultvalues.side}</td>
                <td>
                    <label htmlFor="top2">ax2</label>
                    <input type="number" min="0.1" max="100" id="top2" name="top2" defaultValue={props.defaultvalues.ax2 || ''}></input>
                </td>
                <td>
                    <label htmlFor="top1">bx</label>
                    <input type="number" min="0.1" max="100" id="top1" name="top1" defaultValue={props.defaultvalues.bx || ''}></input>
                </td>
                <td>
                    <label htmlFor="top0">c</label>
                    <input type="number" min="0.1" max="100" id="top0" name="top0" defaultValue={props.defaultvalues.c || ''}></input>
                </td>
            </tr> 
    );
};

export default SidebarAlgebraRow

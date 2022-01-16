import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { IAppState } from '../Interfaces/IState'
import ControlColumn from './ControlColumn'
import CentreSection from './CentreSection'
import HelpColumn from './HelpColumn'

const CentreRow = (props) => {

    useEffect(() => {
        console.log("Help open props change event")
    }, [props])

    let dynW = props.openHelp.width

    return (
        <div className="centrerow">
            <table className="tablecentral">
                <tbody className="tbodycentral">
                    <tr>
                        <td className="controlcolumn"><ControlColumn /></td>
                        <td className="centresection"><CentreSection /></td>
                        {/* <td className="helpcolumn" style={{width : dynW}}><HelpColumn /></td> */}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (allState: IAppState) => {   
    return{ 
        openHelp: allState.openHelp     
    }
  }
  
export default connect(
    mapStateToProps, 
    null
)
(CentreRow)
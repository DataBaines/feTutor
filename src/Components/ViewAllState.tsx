import React from 'react'
import { useSelector } from 'react-redux'
import { IAppState } from 'src/Interfaces/IState'

const ViewAllState = ({ allState }) => {
    let ht = `You submitted:\n${JSON.stringify(allState, null, ' ')}`
    const state = useSelector((state: IAppState) => state)

    const styles ={
        color: 'purple',
        fontFamily: "Lucida Console",
        fontSize: '0.85em'
    }

    return(       
        <div>
            <h3>State:-</h3>
            <p style={styles}>{ht}</p>
        </div>        
    )
}

export default ViewAllState

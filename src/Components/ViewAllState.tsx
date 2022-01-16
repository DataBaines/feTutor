import React from 'react'
import { connect } from 'react-redux'

const ViewAllState = ({ allState }) => {
    let ht = `You submitted:\n${JSON.stringify(allState, null, ' ')}`

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

const mapStateToProps = (state) => {   
    return{ allState: state }
}

export default connect(mapStateToProps)(ViewAllState)

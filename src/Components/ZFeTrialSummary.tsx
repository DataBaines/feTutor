import React from 'react'
import PropTypes from 'prop-types'

interface IProps {

    htp: number;
    wip: number;
  }

const FeMeshSummary = ({ htp, wip}) => {
    //console.log('Containers ht:' + {prop1.ht})
    return(       
        <div>
            <p>FeMeshSummary</p>
            <p>{htp === undefined? 'undefined': 'ok'}</p>
            <p>{wip}</p>
        </div>
    )
}

FeMeshSummary.propTypes = {
    htp: PropTypes.number,
    wip: PropTypes.number
}

export default FeMeshSummary

import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { IAppState } from '../Interfaces/IState'

const statelessRowComp = props => {
  return (    

    <tr key={props.label}>
      <th>{props.label}</th>
        {props.data.map(item => {
          return <td key={item.id}>{item.value == 0 ? '' : Number( item.value.toPrecision(3) )}</td> 
        })
      }
    </tr>
  )
}

const GlobalGrid = (props) => {
  const { dispatch } = props
  const {head, rows} = useSelector((state: IAppState) => state.fe3Mesh.globalStiffness)
  const handleClick = () => props.generateClick() 

  return (
    <div className="largegrid">
      {head && rows &&
        <table className="largegridtable">
          <thead>
            <tr key={-1}>
              <th>{head.tl}</th>
                {head.headers.map(item => {
                  return <th key={item.id}>{item.value}</th> 
                })
              }
            </tr>
          </thead>
          <tbody>
            {rows.map(item => { return statelessRowComp(item) }) }
          </tbody>
        </table>
      }
    </div>
  )
}

export default GlobalGrid

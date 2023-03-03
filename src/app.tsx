import * as React from 'react'
//import * as ReactDom from 'react-dom'
import { createRoot } from "react-dom/client"
import AppFE1 from './AppFE1'

// ReactDom.render(
//     <AppFE1 />,
//     document.getElementById('root')
// );

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<AppFE1  />); //tab="home"
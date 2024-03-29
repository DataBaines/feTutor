import React, {useState} from 'react'
import Navbar from './Components/Navbar'
// import Content from './Components/ZContent'
import Footer from './Components/Footer'
import { Provider, connect } from 'react-redux'
import { AnyAction, CombinedState, Reducer, Store, StoreEnhancer, createStore, applyMiddleware } from 'redux'
import rootReducers from './Reducers/IndexR'
//import FeMeshSummary from './Containers/ZFeTrialSumm'
import { IAppState } from './Interfaces/IState'
import HWCreate from './Components/HWCreate'
//import ImmutableForm from './Components/ZImmutableForm'
import showResults from './Components/ShowResults'
import ViewAllState from './Components/ViewAllState'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//import { newModel, generateMesh } from './Actions/actionUpdateModel'
import CentreSection from './Components/CentreSection'
import ControlColumn from './Components/ControlColumn'
// import { configureStore } from '@reduxjs/toolkit'

const middlewares = [thunk];

function configureStore(): Store<IAppState> {
    const store = createStore(
        rootReducers, 
        //undefined initial state, 
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
}

// const store = configureStore({
//     // Automatically calls `combineReducers`
//     reducer: rootReducers,
//     // Add the RTK Query API middleware
//     middleware: getDefaultMiddleware =>
//       getDefaultMiddleware()//.concat(api.middleware)
//   })

export const store = configureStore()

function AppFE1(props) {
    //const [title, setTitle] = useState(1)
    const mystyle = { fontSize: 30 }

    return(
        <div id="content" className="app">
            <Provider store={store}>
                    {/* <Navbar/>
                    <ControlColumn/>
                    <CentreSection/>
                    <Footer/> */}
                    <header><Navbar/></header>
                    <aside><ControlColumn/></aside>
                    <main><CentreSection/></main>
                    <footer><Footer/></footer>
            </Provider>
        </div>
    )

    /*
    function handleHWSubmit(values, dispatch) {
        // Do something with the form values
        console.log(values);
        showResults(values);
        dispatch(newModel(values.height, values.width))
    }

    function handleAlgebraSubmit(values) {
        // Do something with the form values
        console.log('Algebra data:');
        console.log(values);
        showResults(values);
    }
    

    function gaussPress(){

    }

    function generatePress(dispatch){
        dispatch(generateMesh())  
    }

    function helpPress(){
        
    }

    function globalPress(){
        
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "350px";
    }
      
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

   */



    // function handleTitleChange(evt) {
    //     setTitle(evt.target.value)
    // }
}

export default AppFE1

// function applyMiddleware(arg0: any): import("redux").StoreEnhancer<IAppState> {
//     throw new Error('Function not implemented.')
// }
// function configureStore(rootReducers: Reducer<CombinedState<IAppState>, AnyAction>, arg1: StoreEnhancer<IAppState, {}>) {
//     throw new Error('Function not implemented.')
// }


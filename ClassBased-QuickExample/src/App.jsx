// Default Props


import './App.css'
import React from "react";
import {MyCustomComponent} from "./components/MyCustomComponent.jsx";
import FunctionalComponent from "./components/FunctionalBased.jsx";
import {ClassBasedComponent} from "./components/ClassBasedComponent.jsx";


class App extends React.Component {


    render() {
        return <div className='message-box' style={{display: "flex", gap :"50px"}}>
            {/*<MyCustomComponent />*/}
            <FunctionalComponent></FunctionalComponent>
            <ClassBasedComponent></ClassBasedComponent>
        </div>
    }
}

export default App

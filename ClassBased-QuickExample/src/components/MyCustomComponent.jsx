import React from 'react'
import ReactDOM from 'react-dom'

export class MyCustomComponent extends React.Component {

    //  The constructor in a React component is used primarily for two purposes:
// Setting the initial state (this.state = { ... }).
// Binding methods to the class instance (if you're not using arrow functions).
    constructor(props) {
        super(props); // Calls the parent class (React.Component) constructor
        this.state = {
            counter: 0 // Sets an initial state with a key 'username'
        };
    }

    render() {
        return (
            <div className='message-box'>
                Counter {this.state.counter}
                <button onClick={() => {
                    this.setState({counter: this.state.counter + 1})
                }}>+
                </button>
                <button onClick={() => {
                    this.setState({counter: this.state.counter - 1})
                }}>-
                </button>
            </div>
        )
    }
}

MyCustomComponent.defaultProps = {
    username: 'Arshkhan'
}
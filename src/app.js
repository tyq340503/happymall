import React from 'react';
import ReactDom from 'react-dom';

let x = <div>hello</div>;

class TestComponent extends React.ComponentP {
    constructor(){
        super(props);
        this.state = {
            name: 'test'
        }

    }
    render() {
        return <h1>hello2 {this.state.name}</h1>
    }
}


ReactDOM.render(
    <div></div>
)
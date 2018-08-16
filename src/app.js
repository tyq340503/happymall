import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from 'page/home/index.js';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

let x = <div>hello</div>;

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'test'
        }

    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <h1>hello2 {this.state.name}</h1>
                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

ReactDOM.render(
    <TestComponent />,
    document.getElementById('app')
)
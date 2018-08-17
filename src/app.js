import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from 'page/home/index.js';
import { Login } from 'page/login/index.js';
import { LayOut } from 'component/layout/index.js';
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
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" render={
                        props => (

                            <LayOut>
                                <Switch>
                                    <Route exact path="/" component={Home}></Route>
                                    <Route path="/product" component={Home}></Route>
                                </Switch>
                            </LayOut>
                        )
                    }></Route>
                </BrowserRouter>

            </div>
        )
    }
}

ReactDOM.render(
    <TestComponent />,
    document.getElementById('app')
)
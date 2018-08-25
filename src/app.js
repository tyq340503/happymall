import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from 'page/home/index.js';
import { ProductRouter } from 'page/product/index/index.js';
import { Login } from 'page/login/index.js';
import { UserList } from 'page/user/index.js'
import { Error } from 'page/error/index.js';
import { LayOut } from 'component/layout/index.js';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';


let x = <div>hello</div>;

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'test'
        }

    }

    render() {

        let routerLink = (
            <LayOut>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/product" component={ProductRouter}></Route>
                    <Route path="/user/index" component={UserList}></Route>
                    <Redirect exact from="/user" to="/user/index"></Redirect>
                    <Route component={Error}></Route>
                </Switch>
            </LayOut>
        );

        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/" render={
                            props => routerLink
                        }></Route>
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
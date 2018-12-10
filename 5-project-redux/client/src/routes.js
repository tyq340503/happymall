import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/home';
import Layout from './hoc/layout'
import Auth from './hoc/auth'
import Login from './containers/Admin/login'
import Register from './containers/Admin/register';


const Routes = () => {
    return (
        <Layout>

            <Switch>
                <Route path="/" exact component={Auth(Home,null)} />
                <Route path="/login" exact component={Auth(Login,false)}/>
                <Route path="/user/register" exact component={Auth(Register,true)}/>

            </Switch>
        </Layout>
    )
}

export default Routes;
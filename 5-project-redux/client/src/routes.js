import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/home';
import Layout from './hoc/layout'
import Auth from './hoc/auth'


const Routes = () => {
    return (
        <Layout>

            <Switch>
                <Route path="/" exact component={Auth(Home,null)} />

            </Switch>
        </Layout>
    )
}

export default Routes;
import React from 'react';
import { ProductList } from 'page/product/index/index.js';
import { ProductSave } from 'page/product/index/save.js';
import { ProductDetail } from 'page/product/index/detail.js';
import { Cotegory } from 'page/product/category/index.js';
import { Cotegory } from 'page/product/category/add.js';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';


class ProductRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'test'
        }

    }

    render() {

        let routerLink = (
            <Switch>
                <Route path="/product/index" component={ProductList}></Route>
                <Route path="/product/save/:pid?" component={ProductSave}></Route>
                <Route path="/product/detail/:pid" component={ProductDetail}></Route>
                <Route path="/product-category/index/:categoryid" component={Cotegory}></Route>                    <Route path="/product-category/add" component={ProductRouter}></Route>
                <Route path="/product-category/add" component={CotegoryAdd}></Route>
                <Redirect exact from="/product" to="/product/index"></Redirect>
                <Redirect exact from="/product-category" to="/product-category/index"></Redirect>
                <Route component={Error}></Route>
            </Switch>
        );

        return (
            <div>
                <Route path="/login" component={Login}></Route>
                <Route path="/" render={
                    props => routerLink
                }></Route>

            </div>
        )
    }
}

import React from 'react';
import './index.scss';
// import { LayOut } from 'component/layout/index.js';
import { PageTitle } from 'component/pagetitle/index.js';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <div id="page-wrapper">
                    <PageTitle title="Dashboard" />
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/user" className="color-box ">
                                <p className="desc">user</p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/product">
                                <p className="desc">product</p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/order">
                                <p className="desc">order</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
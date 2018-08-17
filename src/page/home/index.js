import React from 'react';
import './index.scss';
// import { LayOut } from 'component/layout/index.js';
import { PageTitle } from 'component/pagetitle/index.js';
import { Link } from 'react-router-dom';
import Util from 'util/util.js';
import UtilService from 'service/userService.js';


const _utilService = new UtilService();

const _util = new Util();

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: '-',
            productCount: '-',
            orderCount: '-'
        }
    }

    componentDidMount() {
        this.loadCount();
    }

    loadCount() {
        _utilService.getCount().then(
            (res) => {
                this.setState(res);
            }, (err) => {
                _util.sendErr(err);
            }
        )
    }

    render() {
        return (

            <div>
                <div id="page-wrapper">
                    <PageTitle title="Dashboard" />
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/user" className="color-box yellow">
                                <p className="count">{this.state.userCount}</p>
                                <p className="desc">user</p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/product" className="color-box green">
                                <p className="count">1254</p>
                                <p className="desc">product</p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/order" className="color-box blue">
                                <p className="count">15342</p>
                                <p className="desc">order</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
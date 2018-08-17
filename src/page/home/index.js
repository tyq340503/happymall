import React from 'react';
import './index.css';
// import { LayOut } from 'component/layout/index.js';
import { PageTitle } from 'component/pagetitle/index.js';

export class Home extends React.Component {
    render() {
        return (

            <div>
                <div id="page-wrapper">
                    <PageTitle title="Dashboard" />
                    <div className="row">
                        <div className="col-md-12">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
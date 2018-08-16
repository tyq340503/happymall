import React from 'react';
import { TopNav } from 'component/topnav/index.js';
import { SideNav } from 'component/sidenav/index.js';
import './main.css';

export class LayOut extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <TopNav />
                <SideNav />
            </div>
        )
    }
}
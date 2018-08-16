import React from 'react';
import { LayOut } from 'component/layout/index.js';

export class Home extends React.Component {
    render() {
        return (

            <div>
                <LayOut />
                Home component
                <button className="btn btn-defalut">test</button>
            </div>
        )
    }
}
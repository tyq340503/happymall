import React from 'react';
import { Link } from 'react-router-dom';


export class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <div id="page-wrapper">
                    <PageTitle title="error" className="error" />
                    <Link to="/">back to dashboard</Link>
                </div>
            </div>
        )
    }
}
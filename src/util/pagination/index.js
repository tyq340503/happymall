import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';


export class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="row col-md-12">

                <Pagination {...this.props}
                    hideOnSinglePage
                    showQuickJumper />
            </div>
        )
    }
}
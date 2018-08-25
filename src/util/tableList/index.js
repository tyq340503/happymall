import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';


export class TableList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let header = this.props.header.map((head, index) => {
            <th key={index} width={head.width}>{head}</th>
        });
        let content = this.props.children;
        let error = (
            <tr>
                <td colSpan={this.props.header.length} className="text-center">message error</td>
            </tr>
        )
        let showBody = content > 0 ? content : error
        return (

            <table className="table table-striped">
                <thead>
                    <tr>
                        {header}
                    </tr>
                </thead>
                <tbody>
                    {
                        showBody
                    }
                </tbody>
            </table>
        )
    }
}
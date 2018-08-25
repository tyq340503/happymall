import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';
import Util from 'util/util.js';
import TableList from 'util/tableList/index.js';
import UserService from 'service/userService.js';
// import Pagination from 'util/pagination/index.js';

const _util = new Util();
const _userService = new UserService();

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listType: 'list',
            pageNum: 1,
            firstLoad: true,
            searchType: 'productId',
            searchKeyWord: ''
        };
    }

    componentDidMount() {
        this.loadUserList()
    }

    loadUserList() {
        let params = {}
        _userService.loadUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, err => {
            this.setState({ list: [] });
            _util.sendErr(err);
        })
    }

    onPageChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        })
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }

    onSearch() {
        
    }

    render() {
        let message = (this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>ID</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>product</td>
                    <td>order</td>
                </tr>

            );
        }));
        // let error = (
        //     <tr>
        //         <td colSpan="5" className="text-center">message error</td>
        //     </tr>
        // )
        // let showBody = this.state.list.length > 0 ? message : error;
        let headContent = [
            { name: 'ID', width: '10%' },
            { name: 'username', width: '20%' },
            { name: 'email', width: '10%' },
            { name: 'product', width: '35%' },
            { name: 'order', width: '15%' },
        ];
        return (

            <div>
                <div id="page-wrapper">
                    {/* <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>username</th>
                                <th>email</th>
                                <th>product</th>
                                <th>order</th>

                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table> */}
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                                onChange={e => { this.onValueChange(e) }}>
                                <option value="productId">search id</option>
                                <option value="productName">search name</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                onChange={e => { this.onValueChange(e) }}
                                className="form-control" placeholder="keyword" />
                        </div>
                        <button className="btn btn-default"
                            onClick={this.onSearch()}>search</button>
                    </div>
                    <TableList header={headContent}>
                        {
                            // showBody
                            message
                        }
                    </TableList>
                    <PageTitle title="error" className="error" />
                    <Link to="/">back to dashboard</Link>
                </div>

                <Pagination current={11} total={50} onChange={pageNum => { console.log(pageNum) }} />
            </div>
        )
    }
}
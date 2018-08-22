import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';
import Util from 'util/util.js';
import UserService from 'service/userService.js';
// import Pagination from 'util/pagination/index.js';

const _util = new Util();
const _userService = new UserService();

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            firstLoad: true
        };
    }

    componentDidMount() {
        this.loadUserList()
    }

    loadUserList() {
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
        let error = (
            <tr>
                <td colSpan="5" className="text-center">message error</td>
            </tr>
        )
        let showBody = this.state.list.length > 0 ? message : error
        return (

            <div>
                <div id="page-wrapper">
                    <table className="table table-striped">
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
                            {
                                showBody
                            }

                        </tbody>
                    </table>
                    <PageTitle title="error" className="error" />
                    <Link to="/">back to dashboard</Link>
                </div>

                <Pagination current={11} total={50} onChange={pageNum => { console.log(pageNum) }} />
            </div>
        )
    }
}
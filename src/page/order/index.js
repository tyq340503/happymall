import React from 'react';
import Util from 'util/util.js';
import TableList from 'util/tableList/index.js';
import ProductService from 'service/productService.js';
import Pagination from 'rc-pagination';
import { PageTitle } from 'component/pagetitle/index.js';
import { Link } from 'react-router-dom';


// import Pagination from 'util/pagination/index.js';

//class 64
const _util = new Util();
const _productService = new ProductService();

export class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        };
    }

    componentDidMount() {
        this.loadOrderrList()
    }

    //service load product list
    loadOrderrList() {
        let params = {
            listType: this.state.listType,
            pageNum: this.state.pageNum
        };
        if (this.state.listType == 'search') {
            params.orderNo = this.state.orderNumber
        }
        _order.loadOrderList(params).then(res => {
            this.setState(res);
        }, err => {
            this.setState({ list: [] });
            _util.sendErr(err);
        })
    }

    //pagenumber
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

    onSearch(orderNumber) {
        // let params = {};
        let searchType = orderNumber == "" ? 'list' : 'search';
        this.setState({
            pageNum: 1,
            listType: searchType,
            orderNo: orderNumber
        }, () => {
            this.loadOrderrList();
        });
        // let params = {
        //     searchType: this.state.searchType
        // };
        _productService.getSearch(params).then(res => {
            this.setState(res);
        }, err => {
            this.setState({ list: [] });
            _util.sendErr(err);
        })
    }

    render() {
        // let message = (this.state.list.map((user, index) => {
        //     return (
        //         <tr key={index}>
        //             <td>ID</td>
        //             <td>{user.username}</td>
        //             <td>{user.email}</td>
        //             <td>product</td>
        //             <td>order</td>
        //         </tr>

        //     );
        // }));
        // let error = (
        //     <tr>
        //         <td colSpan="5" className="text-center">message error</td>
        //     </tr>
        // )
        // let showBody = this.state.list.length > 0 ? message : errora
        let headContent = [
            { name: 'ID', width: '10%' },
            { name: 'content', width: '40%' },
            { name: 'price', width: '10%' },
            { name: 'status', width: '15%' },
            { name: 'operation', width: '15%' },
        ];

        return (

            <div>
                <div id="page-wrapper">
                    <PageTitle className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>add product</span>
                        </Link>
                    </PageTitle>
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
                    <TableList
                        header={headContent}>
                        {
                            this.state.list.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Link className="opear" to={`order/detail/${order.orderNumber}`}>{order.orderNo}</Link>
                                        </td>
                                        <td>{order.recieveName}</td>
                                        <td>{order.statusDesc}</td>
                                        <td>{order.payment}</td>
                                        <td>{order.createTime}</td>
                                        <td>
                                            <Link className="opear" to={`order/detail/${order.orderNumber}`}>order detail</Link>
                                        </td>
                                    </tr>

                                );
                            })
                        }
                    </TableList>
                    <Link to="/">back to dashboard</Link>
                </div>

                <Pagination current={11} total={50} onChange={pageNum => { console.log(pageNum) }} />
            </div>
        )
    }
}
import React from 'react';
import Util from 'util/util.js';
import TableList from 'util/tableList/index.js';
import ProductService from 'service/productService.js';
import Pagination from 'rc-pagination';
import { PageTitle } from 'component/pagetitle/index.js';
import { Link } from 'react-router-dom';


// import Pagination from 'util/pagination/index.js';


const _util = new Util();
const _productService = new ProductService();

export class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            firstLoad: true,
            searchType: 'productId'
        };
    }

    componentDidMount() {
        this.loadUserList()
    }

    //service load product list
    loadUserList() {
        _productService.loadProductList(this.state.pageNum).then(res => {
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

    setStatus(e, productId, status) {
        currentStatus = status == 1 ? 2 : 1;
        confirm = status == 1 ? 'this product off sale' : 'this product on sale';
        if (window.confirm(confirm)) {
            _productService.setStatus({
                productId: productId,
                status: currentStatus
            }).then(res => {
                _util.successTips(res);
                this.loadUserList()
            }, err => {
                _util.sendErr(res);
            })
        }
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }

    onSearch() {
        // let params = {};
        if (searchType == 'productId') {
            let params = {
                productId: this.state.productId
            }
        } else {
            let params = {
                productName: this.state.productName
            }
        }
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
                            this.state.list.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}{product.subtitle}</td>
                                        <td>{user.email}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <p>
                                                {product.status == 1 ? 'onsale' : 'offsale'}
                                            </p>
                                            <button
                                                className="btn btn-warning btn-xs"
                                                onClick={e => { this.setStatus(e, product.id, product.status) }}>
                                                {product.status == 1 ? 'onsale' : 'offsale'}
                                            </button>
                                        </td>
                                        <td>
                                            <Link className="opear" to={`product/detail/${product.id}`}>product detail</Link>
                                            <Link className="opear" to={`product/save/${product.id}`}>edit</Link>
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
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';
import Util from 'util/util.js';
import TableList from 'util/tableList/index.js';
import ProductService from 'service/productService.js';

// import Pagination from 'util/pagination/index.js';

const _util = new Util();
const _productService = new ProductService();

export class Cotegory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listType: 'list',
            pageNum: 1,
            firstLoad: true,
            searchType: 'productId',
            searchKeyWord: '',
            parentCateId: 0
        };
    }

    componentDidMount() {
        this.loadCateList()
    }

    loadCateList() {
        let params = {}
        _productService.getClass(this.state.parentCateId).then(res => {
            this.setState({ list: res });
        }, err => {
            this.setState({ list: [] });
            _util.sendErr(err);
        })
    }

    onPageChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadCateList();
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

    update(id, name) {
        let newname = window.prompt('new name', id);
        if (newname) {
            _productService.updateCateName({
                categoryId: id,
                categoryName: newname
            }).then(res => {
                this.loadCateList()
            }, err => {
                _util.sendErr(err);
            })
        }
    }

    componentDidUpdate(props, state) {
        if (props.location.pathname != this.props.location.pathname) {
            this.setState({
                parentCateId: this.props.match.params.categoryId || 0
            }, () => {
                this.loadCateList()
            })
        }
    }

    render() {
        let message = (this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                            onClick={e => { this.update(category.id, category.name) }}></a>
                        {
                            category.parentId ? <Link to={`/product-category/index/${category.id}`}> see childcategory</Link> : null
                        }
                    </td>
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
            { name: 'CotegoryId', width: '10%' },
            { name: 'CotegoryName', width: '40%' },
            { name: 'operate', width: '10%' }
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
import React from 'react';
import Util from 'util/util.js';
// import TableList from 'util/tableList/index.js';
import ProductService from 'service/productService.js';
// import Pagination from 'rc-pagination';
import { PageTitle } from 'component/pagetitle/index.js';
import { Link } from 'react-router-dom';
import Selector from 'page/product/index/selector.js';
import Upload from 'util/upload/upload.js';
import Editor from 'util/editor/index.js';

const _util = new Util();
const _productService = new ProductService();

export class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            classId: 0,
            parentId: 0,
            price: '',
            name: '',
            content: '',
            stock: '',
            img: [],
            detail: '',
            defaultDetail: ''
        };
    }

    componentDidMount() {
        if (this.state.id) {
            _productService.editProduct(this.state.id).then(
                res => {
                    let images = res.img.split(',');
                    res.img = images.map((data) => {
                        return {
                            uri: data,
                            url: data.imgHost + data
                        }
                    });
                    res.defaultDetail = res.detail
                    this.setState(res)
                }, err => {
                    _util.sendErr(err);
                }
            )
        }
    }

    render() {

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
                    <PageTitle title="add product" className="page-header-right" />


                    <div className="form-inline">
                        <div className="form-group">
                            {/* <select className="form-control"
                                onChange={e => { this.onValueChange(e) }}>
                                <option value="productId">search id</option>
                                <option value="productName">search name</option>
                            </select> */}
                            <label className="col-md-2 control-label">product name</label>
                            <div className="col-md-10">
                                <input type="text"
                                    onChange={e => { this.onValueChange(e) }}
                                    name="name"
                                    value={this.state.name}
                                    className="form-control" placeholder="product name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">product content</label>

                            <div className="col-md-10">
                                <input type="text"
                                    onChange={e => { this.onValueChange(e) }}
                                    name="content"
                                    value={this.state.content}
                                    className="form-control" placeholder="content" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">product class</label>
                            <Selector
                                readOnly
                                classId={this.state.classId}
                                parentId={this.state.parentId}
                                onClassChange={(classId, parentId) => { this.onClassChange(classId, parentId) }} />
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">product price</label>

                            <div className="col-md-10">
                                <input type="text"
                                    onChange={e => { this.onValueChange(e) }}
                                    name="price"
                                    readOnly
                                    value={this.state.price}
                                    className="form-control" placeholder="content" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">product stock</label>

                            <div className="col-md-10">
                                <input type="text"
                                    onChange={e => { this.onValueChange(e) }}
                                    name="stock"
                                    readOnly
                                    value={this.state.stock}
                                    className="form-control" placeholder="content" />
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="col-md-2 control-label">product img</label>
                            <div className="col-md-10">
                                {this.state.img.length ? this.state.img.map((data, value) => {
                                    <div className="col-md-10">
                                        <img key={value} src={data.url} />
                                        <i className="fa fa-close"
                                            index={value}
                                            onClick={e => { this.imgDelete(e) }}></i>
                                    </div>
                                }) : null}
                            </div>
                            <div className="col-md-offset-2 col-md-10">
                                <Upload
                                    onSuccess={res => { this.onSuccess(res) }}
                                    onErr={err => { this.onErr(err) }} />

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-2 control-label">product detail</label>

                            <div className="col-md-10">
                                <div className="col-md-10" dangerouslySetInnerHTML={{
                                    __html: this.state.detail
                                }}></div>
                            </div>
                        </div>
                        <button className="btn btn-default"
                            onClick={e => this.submit()}>submit</button>
                    </div>

                    <Link to="/">back to dashboard</Link>
                </div>

            </div>
        )
    }
}
import React from 'react';
import { ProductList } from 'page/product/index/index.js';
import { ProductSave } from 'page/product/index/save.js';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

const _util = new Util();
const _productService = new ProductService();

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstClass: [],
            firstClassId: 0,
            secondClass: [],
            secondClassId: 0
        }

    }

    componentDidMount() {
        this.loadFirstClass();
    }

    componentWillReceiveProps(props) {
        //state and props question
        let classChange = this.props.classId != props.classId,
            parentChange = this.props.parentId != props.parentId;
        if (!classChange && !parentChange) {
            return;
        }
        if (props.parentId == 0) {
            this.setState({
                firstClassId: props.classId,
                secondClassId: 0
            })
        } else {
            this.setState({
                firstClassId: props.parentId,
                secondClassId: props.classId
            },()=>{
                this.loadSecondClass()
            })
        }
    }

    loadFirstClass() {
        _productService.getClass().then(res => {
            this.setState({
                firstClass: res
            });
        }, err => {
            _util.sendErr(err);
        })
    }

    loadSecondClass() {
        _productService.getClass(this.state.firstClassId).then(res => {
            this.setState({
                secondClass: res
            });
        }, err => {
            _util.sendErr(err);
        })
    }

    // use props send to the father component
    onClassChange() {
        if (this.state.firstClassId) {
            this.props.onClassChange(this.state.secondClassId, this.state.firstClassId);
        } else {
            this.props.onClassChange(this.state.firstClassId, 0)

        }
    }

    onValueChange(e) {
        let data = e.target.value || 0;
        this.setState({
            firstClassId: data,
            // clear secondclass each time 
            secondClassId: 0,
            secondClass: []
        }, () => {
            //add second class list
            this.loadSecondClass();
            this.onClassChange()
        })
    }

    onSecondValueChange(e) {
        let data = e.target.value || 0;
        this.setState({
            secondClassId: data
        }, () => {
            //add second class list
            this.onClassChange()
        })
    }

    render() {


        return (

            <div className="col-md-10">
                <select className="form-control"
                    onChange={e => { this.onValueChange(e) }}>
                    <option value="productId">search id</option>
                    {this.state.firstClass.map((data, index) => {
                        <option value={data.id}>{data.name}</option>
                    })}
                </select>
                {
                    this.state.secondClass.length > 0 ?
                        (<select className="form-control"
                            onChange={e => { this.onSecondValueChange(e) }}>
                            <option value="productId">search id</option>
                            {this.state.secondClass.map((data, index) => {
                                <option value={data.id}>{data.name}</option>
                            })}
                        </select>) : null
                }
            </div>
        )
    }
}

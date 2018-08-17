import React from 'react';
import './index.scss';
import Util from 'util/util.js';
import UserService from 'service/userService.js';

const _util = new Util();
const _userService = new UserService();

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: _util.getUrl('redirect') || '/'
        }
    }
    onInputChange(e) {
        let value = e.target.value
        name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    onSubmit(e) {
        let loginInfo = {
            email: this.state.email,
            password: this.state.password
        };
        let flag = _userService.checkInfo(loginInfo);
        if (flag.status) {

            _userService(loginInfo).then((res) => {
                this.props.history.push(this.state.redirect);
            }, (err) => {
                _util.sendErr(err);
            })
        } else {
            _util.sendErr(flag.msg);
        }
    }
    onInputUp(e) {
        if (e.keyCode == 13) {
            this.onSubmit();
        }
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">Panel heading without title</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    id="exampleInputEmail1"
                                    placeholder="Email"
                                    onKeyUp={e => this.onInputUp(e)}
                                    onChange={e => this.onInputChange(e)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onKeyUp={e => this.onInputUp(e)}
                                    onChange={e => this.onInputChange(e)} />
                            </div>

                            <button type="submit" className="btn btn-default btn-block"
                                onClick={e => this.onSubmit(e)}>Submit</button>


                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

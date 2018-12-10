import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions'

class Login extends Component {
    state = {
        email:'',
        password:'',
        error:'',
        success:false
    }

    handleInput = (event) => {
        // console.log(event.target.name)
        this.setState({[event.target.name]:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')
        }
    }

    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
        this.setState({password:""});
    }

    render(){
        let user = this.props.user;

        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>

                    <div className="form_element">
                        <input 
                            type="email"
                            name="email"
                            placeholder="Enter your mail"
                            value={this.state.email}
                            onChange={this.handleInput}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInput}
                        />
                    </div>

                    <button type="submit">Log in</button>

                    <div className="error">
                    {
                        user.login ? 
                            <div>{user.login.message}</div>
                        :null
                    }
                    </div>

                </form>
            </div>

        )
    }
}

function mapStateToProps(state){
    console.log("222");
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(Login)
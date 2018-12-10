import React,{ Component } from 'react';
import { auth } from '../actions'
import {connect} from 'react-redux';

export default function(ComposedClass,reload){
    class AuthenticationCheck extends Component {
        state = {
            loading:true
        }

        componentWillMount(){
            // second
            // console.log("111");
            this.props.dispatch(auth())
            console.log(this.props);
        }

        componentWillReceiveProps(nextProps){
            // after second statetoprops
            console.log("11");
            console.log(nextProps);
            this.setState({loading:false})

            if(!nextProps.user.login.isAuth){
                if(reload){
                    this.props.history.push('/login');
                }
            } else {
                if(reload === false) {
                    this.props.history.push('/user')
                }
            }
        }

        render(){
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return(
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
        
    }
    function mapStateToProps(state){
        //come first
        // console.log(state);
        return{
            user:state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)
}
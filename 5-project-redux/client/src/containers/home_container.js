import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class HomeContainer extends Component {
    componentWillMount() {
        // this.props.artistListAll();
    }

    getKeywords(event) {
        let key = event.target.value;
        this.props.artistList(key)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                home
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        // artists: state.artists
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

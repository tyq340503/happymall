import React, { Component } from 'react';
import { getBookWithReviewer, clearBookWithReviewer } from '../../actions';
import { connect } from 'react-redux';

class BookView extends Component {

}

export default connect(mapStateToProps)(BookView)

import React, { Component } from 'react';
import { getBooks } from '../actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookItem from '../widgetsUI/book_item';


class HomeContainer extends Component {
    componentWillMount() {
        // this.props.artistListAll();
        this.props.dispatch(getBooks(1,0,'desc'))
        debugger;
    }

    // getKeywords(event) {
    //     let key = event.target.value;
    //     this.props.artistList(key)
    // }
    componentWillReceiveProps(){
        
    }

    renderItems = (books) => (
        // debugger;
        books.list?  
            books.list.map( item => (
                <BookItem {...item} key={item._id}/>
            ))
        :null
    )

    loadmore = () => {
        let count = this.props.books.list.length;
        this.props.dispatch(getBooks(1,count,'desc',this.props.books.list))
    }

    render() {
        console.log(this.props)
        return (
            <div>
                home
                {this.renderItems(this.props.books)}
                <div 
                    className="loadmore"
                    onClick={this.loadmore}
                >Load More</div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        // artists: state.artists
        books:state.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
export default connect(mapStateToProps)(HomeContainer)


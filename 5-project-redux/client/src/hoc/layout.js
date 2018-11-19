import React from 'react';
import Header from '../components/header/header';

const Layout = (props) => {
    console.log(this.props);

    return (
        <div>
            <Header/>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;
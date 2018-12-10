import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux'; 
import promiseMiddleware from 'redux-promise';
import { promise } from 'redux-promise-middleware'
import logger from "redux-logger"
import Routes from './routes'
import reducers from './reducers'
import {default as ReduxThunk} from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root'));
    
// const middleware = [promise(), ReduxThunk, logger() ]
// const createStoreWithMiddleware = applyMiddleware(...middleware);
// const store = createStore(reducers, createStoreWithMiddleware)

// const App = () => {
//     return (
//         <Provider store={store}>
//             <BrowserRouter>
//                 <Routes />
//             </BrowserRouter>
//         </Provider>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'));

// const createStoreWithMiddleware = applyMiddleware(ReduxThunk);
// const store = createStore(reducers, {}, createStoreWithMiddleware)
// const App = () => {
//     return (
//         <Provider store={store}>
//             <BrowserRouter>
//                 <Routes />
//             </BrowserRouter>
//         </Provider>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'));

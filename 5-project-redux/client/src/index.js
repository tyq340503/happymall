import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux'; 
import { promiseMiddleware } from 'redux-promise'
import Routes from './routes'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk';


// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);

// const App = () => {
//     return (
//         <Provider store={createStoreWithMiddleware(reducers)}>
//             <BrowserRouter>
//                 <Routes />
//             </BrowserRouter>
//         </Provider>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'));
const createStoreWithMiddleware = applyMiddleware(ReduxThunk);
const store = createStore(reducers, {}, createStoreWithMiddleware)
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux'; 
import { promiseMiddleware } from 'redux-promise'
import Routes from './routes'
import reducers from './reducers'


const middleware = applyMiddleware(promiseMiddleware)(createStore);
const App = () => {
    return (
        <Provider store={middleware(reducers)}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


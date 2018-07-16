import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/';
import Home from './component/home';
import Patient from './component/patient';

const reducer = combineReducers({ ...reducers, routing: routerReducer });
const store = createStore(reducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            { /* <Route exact path="/" onEnter={() => browserHistory.push('/home')} /> */}
            <Route path="/" component={Home} />
            <Route path="/patient" component={Patient} />
            <Route path="*" onEnter={() => browserHistory.push('/')} />
        </Router>
    </Provider>, document.getElementById('root'));

registerServiceWorker();


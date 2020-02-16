import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux';

import store from './redux/store/store';
import App from './App';
import { SearchPage, VideoPage, FavouritesPage, FeaturesPage } from './pages/index';

const routing = (
    <Provider store={store}>
        <Router>
            <>
                <Route path="/" component={App} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/my-favourites" component={FavouritesPage} />
                <Route exact path="/features" component={FeaturesPage} />
                <Route path="/search/query=:id" component={SearchPage} />
                <Route path="/details/video:id" component={VideoPage} />
            </>
        </Router>
    </Provider>
)


ReactDOM.render(routing, document.querySelector('#root'));
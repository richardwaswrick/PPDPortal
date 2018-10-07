import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Tasks from './components/admin/tasks';
import HomePage from './components/home/index';

export default (
    <Route path="/" component={App}>
        <Route path="/" component={HomePage} />
        <Route path="tasks" component={Tasks} />
    </Route>
);
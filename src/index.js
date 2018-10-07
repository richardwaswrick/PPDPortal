import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import routes from './routes';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

export class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map(props => 
            <Route 
            key = {props.key} 
            path = {props.path}
            component = {props.component}
            />)}
        </Switch>
      </BrowserRouter>
    );
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

ReactDOM.render(<App />, document.getElementById('App'));

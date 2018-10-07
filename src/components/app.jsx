import React from 'react';
import Header from './common/header';
import Footer from './common/footer';
import {Route, Switch, Redirect} from 'react-router-dom';
import routes from '../routes';

export default class App extends React.Component {
  render() {

    const contentStyle = {
      paddingleft: 30,
      paddingright: 30,
      paddingtop: 20
    };

    return (
      <div>
        <Header/>
        <div className="row">
            <div id="content" className="col-md-12" style={{contentStyle}}>
              <Switch>
                {routes.map(props => 
                  <Route 
                    key = {props.key} 
                    path = {props.path}
                    component = {props.component}
                  />)}
                <Redirect to="/" />
              </Switch>
            </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
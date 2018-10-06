import React from 'react';
import Header from './header';
import Footer from './footer';
import Login from './login';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="row">
            <div Id="content" className="col-md-12" Style="padding-left:30px;padding-right:30px;padding-top:20px">
              <Login/>
            </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
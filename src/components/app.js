import React from 'react';
import Header from './header/index';
import Footer from './footer/index';
import Login from './login/index'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div class="row">
            <div Id="content" Class="col-md-12" Style="padding-left:30px;padding-right:30px;padding-top:20px">
              <Login/>
            </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
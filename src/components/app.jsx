import React from 'react';
import Header from './common/header';
import Footer from './common/footer';
import Login from './login';

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
              <Login/>
            </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
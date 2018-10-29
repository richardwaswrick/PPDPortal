import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../actions/callback';

import PropTypes from 'prop-types';

class Callback extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.loading();
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.loading === false;
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.signoutUser();
    const that = this;
    if (/access_token|id_token|error/.test(nextProps.location.hash)) {
      this.props.handleAuthentication((err, result) => {
        if (err) {
          return that.context.router.history.push('/');
        }
        return that.context.router.history.push('/home');
      });
    } else {
      this.context.router.history.push('/');
    }
  }

  render() {
      return (
        <div></div>
      )
  }

}

function mapStateToProps(state) {
  const { loading, error } = state.callback;
  return {
    loading,
    error
  };
}

export default connect(mapStateToProps, actions)(Callback);

import React from 'react';
import ReactDOM from 'react-dom';
import Entities from '../src/components/admin/entities';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Entities />, div);
  ReactDOM.unmountComponentAtNode(div);
});

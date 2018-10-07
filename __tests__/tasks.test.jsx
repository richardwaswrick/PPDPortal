import React from 'react';
import ReactDOM from 'react-dom';
import Tasks from '../src/components/admin/tasks';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tasks />, div);
  ReactDOM.unmountComponentAtNode(div);
});

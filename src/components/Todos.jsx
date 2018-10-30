import React from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../redux/actions/todos/todos';

export function Todos() {
  return (
    <div>
      <h1>Hello I have a state in my redux store</h1>
    </div>
  );
}

export default connect(null, simpleAction)(Todos);

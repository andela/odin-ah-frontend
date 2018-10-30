import React from 'react';
import { Link } from 'react-router-dom';
import Todo from '../Todos';

const Login = () => (
    <div >
      <h1 >Login page</h1>
      <Link to='/'>Back to home page</Link>
      <Todo />
    </div>
);
export default Login;

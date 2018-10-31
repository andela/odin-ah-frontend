import React, { Component } from 'react';

export class SignUp extends Component {
  static invalidHandler(e) {
    if (e.target.name === 'username') {
      e.target.setCustomValidity('Username must be Alphanumeric');
    }
  }

  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.state = {
      email: '', username: '', password: '', confirmPassword: ''
    };
  }

  registerUser() {
    const { email, username, password } = this.state;
    return { email, username, password };
  }

  updateState(e) {
    const data = {};
    data[e.target.name] = e.target.value;
    this.setState({ ...data });
  }

  render() {
    const {
      email, username, password, confirmPassword
    } = this.state;
    return (
      <div >
        <div >
          <div >
            <div >
              <form method="post" id="signupForm" name="signupForm">
                <div>
                  <span>Create Account</span>
                </div>
                <div>
                  <label htmlFor="username"><b>Username</b></label>
                  <input
                    value={username}
                    onChange={this.updateState}
                    onInvalid={SignUp.invalidHandler}
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    pattern="[a-zA-Z0-9]{1,15}"
                    required
                  />
                  <br />
                  <br />
                  <label htmlFor="email"><b>Email</b></label>
                  <input
                    value={email}
                    onChange={this.updateState}
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    required
                  />
                  <br />
                  <br />
                  <label htmlFor="password"><b>Password</b></label>
                  <input
                    value={password}
                    onChange={this.updateState}
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    required
                  />
                  <br />
                  <br />
                  <label htmlFor="match-password"><b>Confirm Password</b></label>
                  <input
                    value={confirmPassword}
                    onChange={this.updateState}
                    id="match-password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required
                  />

                  <br />
                  <br />
                  <button type="button" onClick={this.registerUser}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SignUp;

import React, { Component } from 'react';
import { login } from './UserFunctions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    if (
      document.getElementById('email').value === '' ||
      document.getElementById('password').value === ''
    ) {
      alert('Plaese fill in the E-mail and Password.');
      return false;
    } else {
        login(user).then(res => {
          console.log(res);
          if (res.success) {
            localStorage.setItem('usertoken', res.error);
            // window.location.reload();
            this.props.history.push(`/SearchPage`);
          } else {
            alert(res.error);
          }
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6 mt-5 mx-auto"/>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
              <div className="col-md-6 mt-5 mx-auto"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import { register } from './UserFunctions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    if (
      document.getElementById('first').value === '' ||
      document.getElementById('last').value === '' ||
      document.getElementById('email').value === '' ||
      document.getElementById('password').value === ''
    ) {
      alert('Please fill in all information!');
      return false;
    } else {
      register(user).then(res => {
        console.log(res);
        if (res.success) {
          this.props.history.push(`/login`);
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
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last"
                  placeholder="Enter Last Name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
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
                Register
              </button>
              <div className="col-md-6 mt-5 mx-auto"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

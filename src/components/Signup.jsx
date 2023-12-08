import React, { Component } from 'react'
import axios from 'axios';
// import { Link } from 'react-router-dom';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        name: "",
        email: "",
        password: ""
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

  }

  handleChange(e) {
    this.setState((prevState) => ({
      inputs: {
        ...prevState.inputs,
        [e.target.name]: e.target.value,
      }
    }))
  }

  async sendRequest() {
    const res = await axios.post(`http://localhost:5000/api/user/signup`, {
      name: this.state.inputs.name,
      email: this.state.inputs.email,
      password: this.state.inputs.password,
    }).catch(err => console.log(err))

    let data = null;
    if (res) {
      data = await res.data;
      console.log(data);
    }
    return data;
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.inputs);
    this.sendRequest()
      .then(data => localStorage.setItem("userID", data.user._id))
      .then(data => {
        this.props.setLoggedIn(true);
        window.location.replace("/myBlogs")
      })
      .catch(err => console.log("There is mistake in Sign up"))
  }

  render() {
    return (
      <>
        <header className="masthead" style={{ "backgroundImage": "url('assets/img/about-bg.jpg')" }}>
          <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="page-heading">
                  <h1>Sign up</h1>
                  <span className="subheading">Register new user</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mb-4">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">

                <div className="my-5">
                  <form action="/auth/signup" method="POST" onSubmit={this.handleSubmit}>
                    <div className="form-floating">
                      <input className="form-control" id="name" name="name" type="text" onChange={this.handleChange} value={this.state.name}
                        placeholder="Type your Name..." />
                      <label htmlFor="name">Name</label>
                    </div><br />
                    <div className="form-floating">
                      <input className="form-control" id="email" name="email" type="email" onChange={this.handleChange} value={this.state.email}
                        placeholder="Type your registed email..." required />
                      <label htmlFor="email">Email</label>
                    </div><br />
                    <div className="form-floating">
                      <input className="form-control" id="password" name="password" type="password" onChange={this.handleChange} value={this.state.password}
                        placeholder="Type the password..." required />
                      <label htmlFor="password">Password</label>
                    </div><br />
                    {/* Submit Button*/}
                    <div style={{ textAlign: 'center' }}>
                      <button className="btn text-uppercase" id="submitButton" type="submit" style={{ color: 'orange' }}>Sign Up</button>
                    </div>

                    <span style={{ 'color': '#dc3545', 'fontWeight': 'bold', 'fontStyle': 'oblique' }}>
                      &ensp; &ensp;
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}

export default Signup
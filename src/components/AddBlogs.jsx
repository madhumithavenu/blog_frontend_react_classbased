// import axios from 'axios';
import axios from 'axios';
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export class AddBlogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        title: '',
        description: '',
        image: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const res = await axios.post(`http://localhost:5000/api/blog/add`, {
      title: this.state.inputs.title,
      description: this.state.inputs.description,
      image: this.state.inputs.image,
      user: localStorage.getItem("userID")
    }).catch(err => {
      if (err.response.request.status === 404) {
        alert("User does not exist");
        this.setState(false);
      } else if (err.response.request.status === 400) {
        alert("Invalid password");
        this.setState(false);
      }
    })

    let data = null;
    if (res) {
      data = await res.data;
    }
    return data;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendRequest()
      .then(data => console.log(data))
      .then(() => {
        window.location.replace("/myBlogs")
      })

    console.log(this.state.inputs);

  }
  render() {

    return (
      <>
        <header className="masthead" style={{ "backgroundImage": "url('assets/img/post-sample-image.jpg')" }}>          <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>Add Blog</h1>
                <span className="subheading">Add Your New Blogs</span>
              </div>
            </div>
          </div>
        </div>
        </header>

        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <form action="/blogs" method="POST" onSubmit={this.handleSubmit} >
                <div className="form-floating">
                  <input className="form-control" id="title" name="title" type="text"
                    placeholder="Enter the title..." onChange={this.handleChange} />
                  <label htmlFor="title">Title</label>
                </div>

                <div className="form-floating">
                  <textarea className="form-control" id="description" name="description"
                    placeholder="Enter your description here..." onChange={this.handleChange}></textarea>
                  <label htmlFor="description">Description</label>
                </div>

                <div className="form-floating">
                  <textarea className="form-control" id="image" name="image"
                    placeholder="Add Image" onChange={this.handleChange}></textarea>
                  <label htmlFor="image">Image</label>
                </div><br />

                {/* Submit Button*/}
                <div style={{ textAlign: 'center' }}>
                  <button id="submitButton" className="btn btn-primary text-uppercase" type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>

    )
  }
}

export default AddBlogs
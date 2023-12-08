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
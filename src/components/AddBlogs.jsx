// import axios from 'axios';
import axios from 'axios';
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        title: '',
        description: '',
        image: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState(prevState => {

      if (!e.target.files || Object.keys(e.target.files).length === 0) {
        return ({
          inputs: {
            ...prevState.inputs,
            [e.target.name]: e.target.value,
          }
        })
      }

      return ({
        inputs: {
          ...prevState.inputs,
          [e.target.name]: e.target.value,
          image: e.target.files[0]
        }
      });
    });
  }
  async sendRequest() {
    const formData = new FormData();
    formData.append('title', this.state.inputs.title);
    formData.append('description', this.state.inputs.description);
    formData.append('userID', localStorage.getItem("userID"));
    formData.append('image', this.state.inputs.image, this.state.inputs.image.name);

    const res = await axios.post(`http://localhost:5000/api/blog/add`, formData)
      .catch(err => console.log(err));

    let data = null;
    if (res) {
      data = await res.data;
    }
    return data;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendRequest()
      .then(data => {
        window.location.replace("/myBlogs")
      })

  }
  render() {

    return (
      <>
        <header className="masthead" style={{ "backgroundImage": "url('xxxxx')" }}>
          <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="page-heading">
                  <h1>{this.state.inputs.title}</h1>
                  <span className="subheading">{this.state.inputs.description}</span>
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
                  <input className="form-control" id="image" name="image" type="file"
                    placeholder="Upload an Image" onChange={this.handleChange}></input>
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

export default AddBlog
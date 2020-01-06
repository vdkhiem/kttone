import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

class UpdateInventoryType extends Component {
  state = {
    code: '',
    description: ''
  };

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get(
        'http://localhost:8082/api/inventorytypes/' + this.props.match.params.id
      )
      .then(res => {
        this.setState({
          code: res.data.code,
          description: res.data.description
        });
      })
      .catch(err => {
        console.log('Error from UpdateInventoryType');
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      code: this.state.code,
      description: this.state.description
    };

    axios
      .put(
        'http://localhost:8082/api/inventorytypes/' +
          this.props.match.params.id,
        data
      )
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('Error in UpdateInventoryType!');
      });
  };

  render() {
    return (
      <div className='UpdateInventoryTypeInfo'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <br />
              <Link to='/' className='btn btn-outline-warning float-left'>
                Show Inventory Type List
              </Link>
            </div>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Edit Inventory Type</h1>
              <p className='lead text-center'>Update Inventory Type Info</p>
            </div>
          </div>

          <div className='col-md-8 m-auto'>
            <form noValidate onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='code'>Code</label>
                <input
                  type='text'
                  placeholder='Code of the Book'
                  name='code'
                  className='form-control'
                  value={this.state.code}
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  placeholder='Describe this book'
                  name='description'
                  className='form-control'
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>

              <button
                type='submit'
                className='btn btn-outline-info btn-lg btn-block'
              >
                Update Inventory Type
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateInventoryType;

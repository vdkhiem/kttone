import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

class CreateInventoryType extends Component {
  state = {
    code: '',
    description: ''
  };

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
      .post('http://localhost:8082/api/inventorytypes', data)
      .then(res => {
        this.setState({
          code: '',
          description: ''
        });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('Error in CreateInventoryCard!');
      });
  };

  render() {
    return (
      <div className='CreateInventoryType'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <br />
              <Link to='/' className='btn btn-outline-warning float-left'>
                Show Inventory Type List
              </Link>
            </div>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Add Inventory Type</h1>
              <p className='lead text-center'>Create new inventory type</p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Code of the Inventory Type'
                    name='code'
                    className='form-control'
                    value={this.state.code}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Describe this book'
                    name='description'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type='submit'
                  className='btn btn-outline-warning btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInventoryType;

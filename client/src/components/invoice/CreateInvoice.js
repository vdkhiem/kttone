import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../App.css';
import InvoiceDetail from './InvoiceDetail';

class CreateInvoice extends Component {
  state = {
    code: '',
    customer: '',
    invoiceDate: '',
    dueDate: '',
    customers: [],
    invoiceDetails: [],
    loading: false
  };

  componentWillMount() {
    this.setState({ loading: true });
    axios
      .get('http://localhost:8082/api/customers')
      .then(res => {
        this.setState({
          customer: res.data.length > 0 ? res.data[0]._id : '',
          customers: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log('Error from InvoiceList');
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post('http://localhost:8082/api/invoices', this.state)
      .then(res => {
        this.setState({
          code: '',
          customer: '',
          invoiceDate: '',
          dueDate: ''
        });
        this.props.history.push('/');
      })
      .catch(err => {
        alert('Error in Create Invoice. \n' + JSON.stringify(err));
        this.setState({ loading: false });
        console.log('Error in CreateInvoiceCard!');
      });
  };

  renderCustomers() {
    return (
      <select
        name='customer'
        className='form-control'
        value={this.state.customer}
        onChange={this.onChange}
      >
        {this.state.customers.map(customer => {
          return <option value={customer._id}> {customer.name} </option>;
        })}
      </select>
    );
  }

  render() {
    return (
      <div className='CreateInvoice'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 m-auto'>
              <br />
              <Link to='/' className='btn btn-outline-warning float-left'>
                Show Invoice List
              </Link>
            </div>
            <div className='col-md-12 m-auto'>
              <h1 className='display-4 text-center'>Add Invoice</h1>
              <p className='lead text-center'>Create new invoice</p>

              <form noValidate onSubmit={this.onSubmit}>
                <div class='form-row'>
                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor='code'>Invoice Number</label>
                    <input
                      type='text'
                      placeholder='Invoice Number'
                      name='code'
                      className='form-control'
                      value={this.state.code}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor='customer'>Customer</label>
                    {this.renderCustomers()}
                  </div>

                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor='invoiceDate'>Invoice Date</label>
                    <input
                      type='date'
                      placeholder='yyyy-mm-dd'
                      name='invoiceDate'
                      className='form-control'
                      value={this.state.invoiceDate}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor='dueDate'>Due Date</label>
                    <input
                      type='date'
                      placeholder='yyyy-mm-dd'
                      name='dueDate'
                      className='form-control'
                      value={this.state.dueDate}
                      onChange={this.onChange}
                    />
                  </div>

                  <button
                    class='btn btn-primary btn-block col-md-3 mb-3'
                    type='submit'
                    disabled={this.state.loading}
                  >
                    {!this.state.loading ? (
                      'Save'
                    ) : (
                      <span
                        class='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                      ></span>
                    )}
                  </button>
                </div>
              </form>
              <InvoiceDetail invoice={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInvoice;

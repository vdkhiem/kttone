import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getDateOnly } from '../common/Utility';
import '../../App.css';
import InvoiceDetail from './InvoiceDetail';

class UpdateInvoice extends Component {
  state = {
    code: '',
    customer: '',
    invoiceDate: '',
    dueDate: '',
    customers: [],
    updatedDate: '',
    loading: true
  };

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/invoices/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          code: res.data.code,
          customer: res.data.customer,
          invoiceDate: res.data.invoiceDate,
          dueDate: res.data.dueDate
        });

        axios
          .get('http://localhost:8082/api/customers')
          .then(res => {
            this.setState({
              customers: res.data,
              loading: false
            });
          })
          .catch(err => {
            this.setState({ loading: false });
            console.log('Error from InvoiceList');
          });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log('Error from UpdateInvoice.', err);
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      updatedDate: Date.now,
      loading: true
    });

    this.setState(prevState => ({
      ...prevState,
      updatedDate: Date.now,
      loading: true
    }));

    axios
      .put(
        'http://localhost:8082/api/invoices/' + this.props.match.params.id,
        this.state
      )
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        alert('Error in Update Invoice. \n' + JSON.stringify(err));
        console.log('Error in UpdateInvoice!', err);
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

  getDateOnly(date) {
    return date.split('T')[0];
  }

  render() {
    return (
      <div className='UpdateInvoiceInfo'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <br />
              <Link to='/' className='btn btn-outline-warning float-left'>
                Show Invoice List
              </Link>
            </div>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Edit Invoice</h1>
              <p className='lead text-center'>Update Invoice Info</p>
            </div>
          </div>

          <div className='col-md-8 m-auto'>
            <form noValidate onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='code'>Code</label>
                <input
                  type='text'
                  placeholder='Code of the Invoice'
                  name='code'
                  className='form-control'
                  value={this.state.code}
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <label htmlFor='description'>Customer</label>
                {this.renderCustomers()}
              </div>

              <div className='form-group'>
                <label htmlFor='description'>Invoice Date</label>
                <input
                  type='date'
                  placeholder='yyyy-mm-dd'
                  name='invoiceDate'
                  className='form-control'
                  value={getDateOnly(this.state.invoiceDate)}
                  onChange={this.onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='description'>Due Date</label>
                <input
                  type='date'
                  placeholder='dd-mm-yyyy'
                  name='dueDate'
                  className='form-control'
                  value={getDateOnly(this.state.dueDate)}
                  onChange={this.onChange}
                />

                <button
                  class='btn btn-primary btn-block mt-4'
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
            <InvoiceDetail />
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateInvoice;

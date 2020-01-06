import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

import InvoiceCard from './InvoiceCard';

class InvoiceList extends Component {
  state = {
    invoiceList: [],
    loading: true,
    customers: []
  };

  componentWillMount() {
    axios
      .get('http://localhost:8082/api/invoices')
      .then(res => {
        this.setState({
          invoiceList: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log('Error from InvoiceList');
      });
  }

  editInvoiceSubmit(inventoryType) {
    let invoiceListCopy = this.state.invoiceList.map(item => {
      if (item.id === inventoryType.id) {
        item.code = inventoryType.code;
        item.description = inventoryType.description;
      }
      return item;
    });

    this.setState({
      invoiceList: invoiceListCopy
    });
  }

  addNewInvoice() {
    this.setState((prevState, props) => ({
      invoiceList: [
        ...prevState.invoiceList,
        {
          id:
            Math.max(
              ...prevState.invoiceList.map(function(o) {
                return o.id;
              })
            ) + 1,
          code: '',
          description: ''
        }
      ]
    }));
  }

  renderInvoiceCard() {
    return this.state.invoiceList.map((invoice, index) => (
      <InvoiceCard key={index} invoice={invoice} />
    ));
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-header'>Invoice</div>
              <div className='card-body'>
                <table className='table table-hover'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>Id</th>
                      <th>Invoice #</th>
                      <th>Customer</th>
                      <th>Invoice Date</th>
                      <th>Due Date</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {this.renderInvoiceCard()}
                  <tr>
                    <td colSpan='7'>
                      {this.state.loading ? <Spinner /> : <div></div>}
                    </td>
                  </tr>
                </table>
                <Link
                  to='/create-invoice'
                  className='btn btn-outline-warning float-right'
                >
                  + Add Invoice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceList;

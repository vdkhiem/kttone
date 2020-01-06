import React, { Component } from 'react';

import InvoiceDetailEdit from './InvoiceDetailEdit';
import InvoiceDetailView from './InvoiceDetailView';

class CreateInvoiceDetail extends Component {
  state = {
    invoiceDetails: [
      {
        productId: '',
        quantity: ''
      }
    ],
    isEdit: true
  };

  editInvoiceDetail() {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }));
  }

  addInvoiceDetail = e => {
    alert(JSON.stringify(this.state));
    e.preventDefault();
    this.setState(prevState => ({
      invoiceDetails: [...prevState, { productId: '', quantity: '' }]
    }));
  };

  render() {
    return (
      <div className='form-group col-md-12 mb-12'>
        <table className='table table-hover'>
          <thead className='thead-light'>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th></th>
              <th></th>
            </tr>
            {this.state.invoiceDetails.map(invoiceDetail => {
              return this.state.isEdit ? (
                <InvoiceDetailEdit
                  invoiceDetail={invoiceDetail}
                  editInvoiceDetail={this.editInvoiceDetail.bind(this)}
                />
              ) : (
                <InvoiceDetailView
                  invoiceDetail={invoiceDetail}
                  editInvoiceDetail={this.editInvoiceDetail.bind(this)}
                />
              );
            })}
            <tr>
              <td colSpan='4'>
                <button
                  className='btn btn-primary'
                  onClick={this.addInvoiceDetail}
                >
                  Add
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default CreateInvoiceDetail;

import React, { Component } from 'react';

class InvoiceDetailView extends Component {
  editInvoiceDetail() {
    this.props.editInvoiceDetail();
  }

  render() {
    return (
      <tr>
        <td>{}</td>
        <td>{}</td>
        <td>
          <button onClick={this.editInvoiceDetail.bind(this)}>Edit</button>
        </td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    );
  }
}

export default InvoiceDetailView;

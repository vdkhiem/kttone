import React, { Component } from 'react';

class InvoiceDetailEdit extends Component {
  onchange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  editInvoiceDetail() {
    this.props.editInvoiceDetail();
  }

  render() {
    return (
      <tr>
        <td>
          <select>
            <option value='1'>Product 1</option>
            <option value='1'>Product 2</option>
          </select>
        </td>
        <td>
          <input type='text' placeholder='Quantity' name='quantity'></input>
        </td>
        <td>
          <button onClick={this.editInvoiceDetail.bind(this)}>Save</button>
        </td>
        <td>
          <button>Cancel</button>
        </td>
      </tr>
    );
  }
}

export default InvoiceDetailEdit;

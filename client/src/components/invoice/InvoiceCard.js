import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

class InvoiceCard extends Component {
  deleteInvoice = () => {
    const { _id, code } = this.props.invoice;
    let r = window.confirm(`Do you want to delete this ${code}'?`);
    if (r === true) {
      axios
        .delete('http://localhost:8082/api/invoices/' + _id)
        .then(res => {
          this.props.history.push('/');
        })
        .catch(err => {
          console.log('Error in Delete invoice!');
        });
    }
  };

  render() {
    const { _id, code, customer, invoiceDate, dueDate } = this.props.invoice;

    return (
      <tr>
        <td>{_id}</td>
        <td>{code}</td>
        <td>{customer.name}</td>
        <td>{invoiceDate}</td>
        <td>{dueDate}</td>
        <td>
          <Link to={`/edit-invoice/${_id}`}>Edit</Link>
        </td>
        <td>
          <button onClick={this.deleteInvoice.bind()}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default InvoiceCard;

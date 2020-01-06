import React, { useState } from 'react';
import axios from 'axios';

const CreateInvoiceDetail = props => {
  const initialFormState = { invoice: '', product: '', quantity: '' };
  const [invoiceDetail, setInvoiceDetail] = useState(initialFormState);

  const onChange = e => {
    const { name, value } = e.target;
    setInvoiceDetail({ ...invoiceDetail, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!invoiceDetail.product) return;
    props.addInvoiceDetail(invoiceDetail);
    setInvoiceDetail(initialFormState);

    // axios
    //   .post('http://localhost:8082/api/invoicedetails', invoiceDetail)
    //   .then(res => {
    //     props.addInvoiceDetail(invoiceDetail);
    //     setInvoiceDetail(initialFormState);
    //   })
    //   .catch(err => {
    //     alert('Error in Create Invoice. \n' + JSON.stringify(err));
    //     this.setState({ loading: false });
    //     console.log('Error in CreateInvoiceCard!');
    //   });
  };

  return (
    <tr>
      <form onSubmit={onSubmit}>
        <td>
          <input
            type='text'
            placeholder='Product'
            name='product'
            value={invoiceDetail.product}
            onChange={onChange}
          ></input>
        </td>
        <td>
          <input
            type='text'
            placeholder='Quantity'
            name='quantity'
            value={invoiceDetail.quantity}
            onChange={onChange}
          ></input>
        </td>
        <td>
          <button className='btn btn-primary'>Add</button>
        </td>
      </form>
    </tr>
  );
};

export default CreateInvoiceDetail;

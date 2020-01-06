import React, { useState } from 'react';

const UpdateInvoiceDetail = props => {
  const [invoiceDetail, setInvoiceDetail] = useState(
    props.currentInvoiceDetail
  );

  const onChange = e => {
    const { name, value } = e.target;
    setInvoiceDetail({ ...invoiceDetail, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!invoiceDetail.product) return;

    props.updateInvoiceDetail(invoiceDetail);
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
          <button className='btn btn-primary'>Save</button>
          <button
            className='btn btn-primary'
            onClick={() => props.setEditing(false)}
          >
            Cancel
          </button>
        </td>
      </form>
    </tr>
  );
};

export default UpdateInvoiceDetail;

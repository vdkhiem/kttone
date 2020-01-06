import React from 'react';

const InvoiceDetailList = props => (
  <tr>
    {props.invoiceDetails.length > 0 ? (
      props.invoiceDetails.map(invoiceDetail => {
        return (
          <tr>
            <td>{invoiceDetail.product}</td>
            <td>{invoiceDetail.quantity}</td>
            <td>
              <button
                className='btn btn-information'
                onClick={() => {
                  props.editRow(invoiceDetail);
                }}
              >
                Edit
              </button>
              <button className='btn btn-informationn'>Delete</button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan='3'>No data</td>
      </tr>
    )}
  </tr>
);

export default InvoiceDetailList;

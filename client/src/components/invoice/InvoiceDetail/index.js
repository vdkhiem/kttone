import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InvoiceDetailList from './InvoiceDetailList';
import CreateInvoiceDetail from './CreateInvoiceDetail';
import UpdateInvoiceDetail from './UpdateInvoiceDetail';

const Index = () => {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [editing, setEditing] = useState(false); // set editing state and default is false
  const [currentInvoiceDetail, setInvoiceDetail] = useState({
    invoice: '',
    product: '',
    quantity: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/invoicedetails')
      .then(res => {
        setInvoiceDetails({ invoiceDetails: res.data });
      })
      .catch(err => {
        console.log('Error from fetching invoice detail list');
      });
  });

  const addInvoiceDetail = invoiceDetail => {
    setInvoiceDetails([...invoiceDetails, invoiceDetail]);
  };

  const editRow = invoiceDetail => {
    setEditing(true);
    setInvoiceDetail({ currentInvoiceDetail: invoiceDetail });
  };

  const updateInvoiceDetail = (_id, updatedInvoiceDetail) => {
    setEditing(false);
    setInvoiceDetails(
      invoiceDetails.map(invoiceDetail =>
        invoiceDetail._id === _id ? updatedInvoiceDetail : invoiceDetail
      )
    );
  };

  return (
    <table className='table table-hover'>
      <thead className='thead-light'>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>

      <InvoiceDetailList invoiceDetails={invoiceDetails} editRow={editRow} />

      {editing ? (
        <UpdateInvoiceDetail
          editing={editing}
          setEditing={setEditing}
          currentInvoiceDetail={currentInvoiceDetail}
          updateInvoiceDetail={updateInvoiceDetail}
        />
      ) : (
        <CreateInvoiceDetail addInvoiceDetail={addInvoiceDetail} />
      )}
    </table>
  );
};

export default Index;

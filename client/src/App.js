import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateInventoryType from './components/inventoryType/CreateInventoryType';
import InventoryTypeList from './components/inventoryType/InventoryTypeList';
// import ShowBookDetails from './components/ShowBookDetails';
import UpdateInvoice from './components/invoice/UpdateInvoice';
import CreateInvoice from './components/invoice/CreateInvoice';
import InvoiceList from './components/invoice/InvoiceList';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={InvoiceList} />
          <Route path='/create-invoice' component={CreateInvoice} />
          <Route path='/edit-invoice/:id' component={UpdateInvoice} />
          {/*<Route path='/show-book/:id' component={ShowBookDetails} /> */}
        </div>
      </Router>
    );
  }
}

export default App;

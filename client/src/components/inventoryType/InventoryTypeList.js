import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InventoryTypeCard from './InventoryTypeCard';

class InventoryTypeList extends Component {
  state = {
    inventoryTypes: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/inventorytypes')
      .then(res => {
        this.setState({
          inventoryTypes: res.data
        });
      })
      .catch(err => {
        console.log('Error from InventoryTypeList');
      });
  }

  render() {
    const inventoryTypes = this.state.inventoryTypes;
    let inventoryTypeList;

    if (!inventoryTypes) {
      inventoryTypeList = 'there is no inventory type record!';
    } else {
      inventoryTypeList = inventoryTypes.map((inventoryType, index) => (
        <InventoryTypeCard inventoryType={inventoryType} key={index} />
      ));
    }

    return (
      <div className='ShowInventoryTypeList'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <br />
              <h2 className='display-4 text-center'>Inventory Type List</h2>
            </div>

            <div className='col-md-11'>
              <Link
                to='/create-inventorytype'
                className='btn btn-outline-warning float-right'
              >
                + Add Inventory Type
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className='list'>{inventoryTypeList}</div>
        </div>
      </div>
    );
  }
}

export default InventoryTypeList;

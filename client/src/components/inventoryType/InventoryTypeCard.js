import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const InventoryTypeCard = props => {
  const inventoryType = props.inventoryType;

  return (
    <div className='card-container'>
      <img
        src='https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3'
        alt=''
      />
      <div className='desc'>
        <h2>
          <Link to={`/edit-inventorytype/${inventoryType._id}`}>
            {inventoryType.code}
          </Link>
        </h2>
        <p>{inventoryType.description}</p>
      </div>
    </div>
  );
};

export default InventoryTypeCard;

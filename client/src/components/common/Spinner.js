import React from 'react';

const Spinner = () => {
  return (
    <div>
      <div class='d-flex justify-content-center'>
        <div class='spinner-border' role='status'>
          <span class='sr-only'>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

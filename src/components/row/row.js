import React from 'react';

import './row.css';

const Row = ({ left, right }) => {
  return (
    <div className="row mr-0 ml-0">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  );
}

export default Row;
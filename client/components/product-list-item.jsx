import React from 'react';

function ProductListItem(props) {
  return (
    <React.Fragment>
      <h5>Product 1</h5>
      <img src="https://bit.ly/2JtVNE6" className="firstProduct"></img>
      <div>
        <strong>Name:</strong> Shake Weight
        <br></br>
        <strong>Price:</strong> $2999
        <br></br>
        <strong>Description:</strong> Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.
        <br></br>
      </div>

    </React.Fragment>

  );
}

export default ProductListItem;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './Item';

function CategoryDetails(props) {
  const { match: { params } } = props;
  const [ loadedState, setLoadedState ] = useState(false);
  const [ itemsState, setItemsState ] = useState({});

  const history = useHistory();

  useEffect(() => {
    if(!loadedState) {
    fetch(`http://localhost:5000/api/items/?category=${params.categoryName}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonifiedResponse) => {
        setItemsState(jsonifiedResponse);
        setLoadedState(true);
      })
      .catch((error) => {
        console.log('Item load Error: ', error);
      });
    }
  }, []);

  const handleDelete = id => {
    fetch(`http://localhost:5000/api/categories/${id}`, { method : 'DELETE'})
      .then((response) => console.log('DELETED', response))
      .then(() => {
        history.push('/categories');
      })
  }

  if(loadedState){
    return (
      <React.Fragment>
        <h1>{params.categoryName}</h1>
        {itemsState.map((item) => {
          return (
            <Item
              itemName={item.itemName}
              category={item.category.categoryName}
              vendor={item.vendor.vendorName}
              purchasePrice={item.purchasePrice}
              purchaseQuantity ={item.purchaseQuantity}
              purchaseQuantityType={item.purchaseQuantityType}
              startingInventory={item.startingInventory}
              itemId={item.itemId}
              key={item.itemId}
              />
            )
         })}
        <button onClick={() => {handleDelete(params.categoryId)}}>Delete</button>
      </React.Fragment>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
};

export default CategoryDetails;
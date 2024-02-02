import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewItemForm } from '../NewItemForm/NewItemForm';

function ShelfPage() {
  const dispatch = useDispatch()
  const items = useSelector(store => store.items)

  useEffect(() => {
    dispatch({type: "FETCH_ITEMS"})
  }, [dispatch])

  function handleDelete(event) {
    let itemsId = event.target.value
    fetch(`/api/item/${itemsId}`, {
      method: 'DELETE',
    })
      .then(response => {
     console.log(itemsId)
      })
      .catch(err => {
        console.error('Error while deleting item', err);
      });
  }

  if(items[0]) {
    return (<>
    <NewItemForm />
    {items.map(item => {
      return (
        <div>
          <h5>{item.description}</h5>
          <img src={item.image_url}/>
          <button onClick={() => handleDelete(event.target)}>DELETE</button>
        </div>
      )
    })}
    </>
   )
  }
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;

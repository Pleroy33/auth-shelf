import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewItemForm } from '../NewItemForm/NewItemForm';

function ShelfPage() {
  const dispatch = useDispatch()
  const items = useSelector(store => store.items)

  useEffect(() => {
    dispatch({type: "FETCH_ITEMS"})
  }, [dispatch])

  function handleDelete(userId, itemId) {
    console.log('ids',userId, itemId)
    axios(`/api/shelf/${userId}/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => {
        dispatch({type: "FETCH_ITEMS"})
      })
      .catch(err => {
        console.error('Error while deleting item', err);
        alert("You are not the user that posted this!")
      });
  }

  if(items[0]) {
    return (<>
    <NewItemForm />
    {items.map(item => {
      return (
        <div key={item.id}>
          <h5>{item.description}</h5>
          <img src={item.image_url}/>
          <button onClick={(event) => handleDelete(item.user_id, item.id)}>DELETE</button>
        </div>
      )
    })}
    </>
   )
  }
  return (
    <div className="container">
      <h2>Shelf</h2>
      <NewItemForm />
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;

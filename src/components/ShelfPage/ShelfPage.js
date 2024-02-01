import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ShelfPage() {
  const dispatch = useDispatch()
  const items = useSelector(store => store.items)

  useEffect(() => {
    dispatch({type: "FETCH_ITEMS"})
  }, [])

  if(items[0]) {
    return (<>
    {items.map(item => {
      return (
        <div>
          <h5>{item.description}</h5>
          <img src={item.image_url}/>
        </div>
      )
    })}
    </>)
  }
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;

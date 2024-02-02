import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';






function MyShelf() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)

    useEffect(()=>{
        dispatch({
            type:'FETCH_MY_ITEMS',
            payload: user.id
        })
    },[])

return(
    <h1>My Shelf!</h1>
)

}







export default MyShelf
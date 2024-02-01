import { useState } from "react";
import { useDispatch } from "react-redux";

export function NewItemForm() {
    const dispatch = useDispatch()
    const [input, setInput] = useState({description: '', image_url: ''})

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({type: "POST_ITEM", payload: input})
        dispatch({type: "FETCH_ITEMS"})
        setInput({description: '', image_url: ''})
    }
    return (
        <form onSubmit={handleSubmit} style={{border: "1px solid black", margin: '10px', padding: "5px"}}>
            <h3>Add an Item</h3>
            <label htmlFor="descInput">Enter Item Description</label>
            <input required type="text" id="descInput" onChange={(event) => setInput({...input, description: event.target.value})} value={input.description}/>
            <label htmlFor="urlInput">Enter Valid Image URL</label>
            <input required type="text" id="urlInput" onChange={(event) => setInput({...input, image_url: event.target.value})} value={input.image_url}/>
            <button type="submit">Submit</button>
        </form>
    )
}
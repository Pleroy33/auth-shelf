export function NewItemForm() {
    const handleSubmit = () => {
        console.log('hi');
    }
    return (
        <form onSubmit={handleSubmit} style={{border: "1px solid black", margin: '10px', padding: "5px"}}>
            <h3>Add an Item</h3>
            <label htmlFor="descInput">Enter Item Description</label>
            <input required type="text" id="descInput"/>
            <label htmlFor="urlInput">Enter Valid Image URL</label>
            <input required type="text" id="urlInput"/>
        </form>
    )
}
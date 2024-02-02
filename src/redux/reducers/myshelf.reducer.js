const myItems = (state = [], action) => {
    if(action.type === "SET_MY_ITEMS") {
        return action.payload
    }
    return state
}

export default myItems
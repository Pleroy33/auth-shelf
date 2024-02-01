import axios from "axios"
import { takeEvery } from "redux-saga/effects"

function* postItem(action){
    yield axios.post('/api/shelf', action.payload)
}

function* postItemSaga(){
    yield takeEvery('POST_ITEM', postItem)
}

export default postItemSaga
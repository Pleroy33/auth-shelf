import axios from "axios"
import { takeEvery, put } from "redux-saga/effects"

function* postItem(action){
    yield axios.post('/api/shelf', action.payload)
    yield put({type: "FETCH_ITEMS"})
}

function* postItemSaga(){
    yield takeEvery('POST_ITEM', postItem)
}

export default postItemSaga
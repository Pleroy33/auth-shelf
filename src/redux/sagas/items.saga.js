import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

function* fetchItems(action) {
    console.log('in fetch items', action);
    try {
        const items = yield axios.get('/api/shelf')
        yield put({type: "SET_ITEMS", payload: items.data})
    } catch (error) {
        console.log(error);
    }
}

function* itemSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems)
}

export default itemSaga
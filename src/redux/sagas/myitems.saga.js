
import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

function* fetchMyItems(action) {
    console.log('in fetch items', action);
    try {
        const items = yield axios.get(`/api/shelf/${action.payload}`)
        yield put({type: "SET_MY_ITEMS", payload: items.data})
    } catch (error) {
        console.log(error);
    }
}

function* myItemsSaga() {
    yield takeLatest('FETCH_MY_ITEMS', fetchMyItems)
}

export default myItemsSaga
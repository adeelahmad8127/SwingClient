import {call, put, all,takeEvery, takeLatest} from 'redux-saga/effects'
import {GET_ALL_USERS,GET_ALL_USERS_SUCCESS,GET_ALL_USERS_FAILURE} from './action'




function* getUsersSaga(){
    alert("HElllo")
 }

function* sagas(){
    yield all([takeEvery(GET_ALL_USERS, getUsersSaga)]);
    yield takeLatest(TEST_PUT_FUNCTION, testPutFunctionCalling);
    // yield takeLatest(FETCH_SMURF_DATA, onFetchSmurfData);
}

export default sagas
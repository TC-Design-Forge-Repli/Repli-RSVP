import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";


// GET
function* fetchMeals() {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/meals'
    })

    yield put({
      type: 'SET_MEALS',
      payload: response.data
    })

  } catch (error) {
    console.error('Error fetchMeals saga:', error);
  }
}

// POST
function* createMeals(action) {
  const newMeals = action.payload;
  console.log('newMeals:', newMeals)

  try {
    const response = yield axios({
      method: 'POST',
      url: '/api/meals',
      data: newMeals
    })

    yield put({
      type: 'SAGA/FETCH_MEALS'
    })

  } catch (error) {
    console.error('Error createMeals saga:', error);
  }
}

function* mealsSaga() {
  yield takeLatest('SAGA/CREATE_MEALS', createMeals);
  yield takeLatest('SAGA/FETCH_MEALS', fetchMeals);
}


export default mealsSaga;
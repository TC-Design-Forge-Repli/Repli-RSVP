import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";


// GET
function* fetchMeals(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: `/api/meals/${action.payload}`
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
  // console.log('newMeals:', newMeals);

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

// PUT meal name
function* updateMealName(action) {
  // console.log('action.payload:', action.payload);

  const meal_id = action.payload.meal_id;
  const event_id = action.payload.event_id;
  const meal_name = action.payload.meal_name;

  try {
    const response = yield axios({
      method: 'PUT',
      url: `api/meals/meal_option${meal_id}/${event_id}`,
      data: {
        meal_id,
        event_id,
        meal_name
      }
    })

    yield put({
      type: 'SAGA/FETCH_MEALS',
      payload: event_id
    })

  } catch (error) {
    console.error('Error updateMealName saga:', error);
  }
}

// PUT meal description
function* updateMealDescription(action) {
  console.log('action.payload:', action.payload);

  const meal_id = action.payload.meal_id;
  const event_id = action.payload.event_id;
  const meal_description = action.payload.description;

  try {
    const response = yield axios({
      method: 'PUT',
      url: `api/meals/meal_description${meal_id}/${event_id}`,
      data: {
        meal_id,
        event_id,
        meal_description
      }
    })

    yield put({
      type: 'SAGA/FETCH_MEALS',
      payload: event_id
    })
    
  } catch (error) {
    console.error('Error updateMealDescription saga:', error);
  }
}

function* mealsSaga() {
  yield takeLatest('SAGA/CREATE_MEALS', createMeals);
  yield takeLatest('SAGA/FETCH_MEALS', fetchMeals);
  yield takeLatest('SAGA/UPDATE_MEAL_NAME', updateMealName);
  yield takeLatest('SAGA/UPDATE_MEAL_DESCRIPTION', updateMealDescription);
}


export default mealsSaga;
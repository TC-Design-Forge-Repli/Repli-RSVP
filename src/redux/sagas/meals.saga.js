import { takeLatest } from "redux-saga/effects";
import axios from "axios";


function* createMeals(action) {
  const newMeals = action.payload;
  console.log('newMeals:', newMeals)

  try {
    const response = yield axios({
      method: 'POST',
      url: '/api/meals',
      data: newMeals
    })

  } catch (error) {
    console.error('Error createMeals saga:', error);
  }
}

function* mealsSaga() {
  yield takeLatest('SAGA/CREATE_MEALS', createMeals);
}


export default mealsSaga;
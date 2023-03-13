import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* editRemindersPageSaga() {
    yield takeEvery('SAGA/FETCH_REMINDERS_PAGE_TO_EDIT', fetchRemindersPageToEdit);
    yield takeEvery('SAGA/UPDATE_REMINDERS_PAGE', updateRemindersPage);
}

function* fetchRemindersPageToEdit(action) {
    try {

        const remindersToEdit=action.payload

        const response = yield axios({
            method: 'GET',
            url:`/api/reminders/${remindersToEdit}`,
        })
    yield put({
        type: 'SET_REMINDERS_TO_EDIT', 
        payload: response.data
    })
} catch(error) {
    console.log('SAGA funciton fetchRemindersPageToEdit error', error)
}
}

function* updateRemindersPage(action) {
    try {
    const remindersToEdit = action.payload
    const response = yield axios({
        method: 'PUT',
        url:`/api/reminders/edit/${remindersToEdit.party_id}`,
        data: {
            email: remindersToEdit.email,
            phoneNumber: remindersToEdit.phoneNumber,
            receiveReminders:remindersToEdit.receiveReminders,
            party_id: remindersToEdit.party_id
        }
    })

} catch(error) {
    console.log('updateRemindersPage SAGA function failed', error)
}

}





export default editRemindersPageSaga;
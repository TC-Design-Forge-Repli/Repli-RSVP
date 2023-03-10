

const remindersToEdit = (state = {}, action) => {
    if (action.type === 'SET_REMINDERS_TO_EDIT') {
        return action.payload;
} else if (action.type === 'EDIT_EMAIL') {
    return {...state, email: action.payload}
} else if (action.type === 'EDIT_PHONE_NUMBER') {
    return {...state, phoneNumber: action.payload}
} else if (action.type === 'EDIT_RECEIVE_REMINDERS')



} 

export default remindersToEdit;


const remindersToEdit = (state = {}, action) => {
    switch(action.type) {
        case 'SET_REMINDERS_TO_EDIT': 
            return action.payload
        case 'EDIT_EMAIL':
            return {...state, email_address:action.payload}
        case 'EDIT_PHONE_NUMBER':
            return {...state, phone_number:action.payload}
        case 'EDIT_RECEIVE_REMINDERS':
            return {...state, receive_reminders:action.payload}
        default: 
            return state;
    }
}









// const remindersToEdit = (state = {}, action) => {
//     if (action.type === 'SET_REMINDERS_TO_EDIT') {
//         return action.payload;
// } else if (action.type === 'EDIT_EMAIL') {
//     return {...state, email: action.payload}
// } else if (action.type === 'EDIT_PHONE_NUMBER') {
//     return {...state, phoneNumber: action.payload}
// } else if (action.type === 'EDIT_RECEIVE_REMINDERS'){
//     return {...state, receiveReminders: action.payload}
// }
// } 

export default remindersToEdit;
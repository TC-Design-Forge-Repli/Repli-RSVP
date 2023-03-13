const singleEvent = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EVENT_CODE':
      const newEventCode = action.payload;
      return {...state, event_code: newEventCode};
    default:
      return state;
  }
}


export default singleEvent;
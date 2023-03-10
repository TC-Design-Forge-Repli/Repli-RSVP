const eventDetails = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENT_DETAILS':
        return action.payload;
      case 'UNSET_EVENT_DETAILS':
        return [];
      default:
        return state;
    }
  };
  
export default eventDetails;
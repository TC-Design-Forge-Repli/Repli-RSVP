const isEventCodeUniqueReducer = (state = '', action) => {
    switch (action.type) {
      case 'IS_EVENT_CODE_UNIQUE':
        return action.payload;
      default:
        return state;
    }
  };
  
export default isEventCodeUniqueReducer;
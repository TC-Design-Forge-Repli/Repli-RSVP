const matchEventCode = (state = '', action) => {
    switch (action.type) {
        case 'DOES_EVENT_CODE_MATCH':
          return action.payload;
        default:
          return state;
      }
    };
    
  export default matchEventCode;
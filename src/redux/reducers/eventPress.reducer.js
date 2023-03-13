const eventPressed = (state = [], action) => {
    switch (action.type) {
    case 'EVENT_PRESSED':
        return action.payload;
    default:
        return state;
    }
  };
  
export default eventPressed;
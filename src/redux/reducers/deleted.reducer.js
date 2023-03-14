const deletedReducer = (state = '', action) => {
    switch (action.type) {
    case 'DELETED':
        return action.payload;
    default:
        return state;
    }
  };
  
export default deletedReducer;
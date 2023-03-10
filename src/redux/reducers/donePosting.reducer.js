const donePostingReducer = (state = {}, action) => {
    switch (action.type) {
    case 'DONE_POSTING':
        return action.payload;
    default:
        return state;
    }
  };
  
export default donePostingReducer;
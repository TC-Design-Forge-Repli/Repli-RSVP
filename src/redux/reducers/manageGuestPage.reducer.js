const partyReducer = (state = [], action) => {
    // console.log("THIS IS FETCH WATCHLIST REDUCER PAYLOAD", action.payload);
    switch (action.type) {
      case 'ADD_PARTY_INPUT':
        return  action.payload;
      default:
        return state;
    }
  };

  export default partyReducer;
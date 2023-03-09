const partyGuests = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_GUESTS':
            return action.payload
        default:
            return state
    }
}

export default partyGuests;
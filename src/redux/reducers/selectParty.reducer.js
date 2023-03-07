const partyNames = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTY_NAMES':
            return action.payload
        default:
            return state
    }
}


export default partyNames;
import { combineReducers } from "redux";

const storeEventCode = (state = [], action) => {
    switch(action.type) {
        case 'STORE_EVENT_CODE':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
   storeEventCode,
})
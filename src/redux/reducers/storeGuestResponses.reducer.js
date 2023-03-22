const storeGuestResponse = (state = [], action) => {
   if (action.type === 'SAVE_RESPONSES') {
    const newGuest_id = action.payload.guest_id;
    const newResponse = action.payload.response;
    const newMeal_id = action.payload.meal_id;
    const newGuestResponse = {
        guest_id: newGuest_id,
        response: newResponse,
        meal_id: newMeal_id
    }
    let newGuestResponses = [...state, newGuestResponse];
    return newGuestResponses;
   }
   return state
}

export default storeGuestResponse;
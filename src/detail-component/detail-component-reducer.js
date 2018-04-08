export const detailComponentReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_DETAIL':
            return {...state, user: action.payload}
        default:
            return state
    }
}
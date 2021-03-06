export const searchInputReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SEARCH_NAME':
            return {...state, name: action.payload}
        case 'SET_SEARCH_YEAR_FROM':
            return {...state, year_from: action.payload}
        case 'SET_SEARCH_YEAR_TO':
            return {...state, year_to: action.payload}
        case 'SET_SEARCH_SUM_FROM':
            return {...state, sum_from: action.payload}
        case 'SET_SEARCH_SUM_TO':
            return {...state, sum_to: action.payload}
        case 'SET_SEARCH_RESULT':
            return {...state, result: action.payload}
        case 'SET_SEARCH_SUGGESTIONS_NAME':
            return {...state, s_name: action.payload, suggestions_hidden: false}
        case 'SET_SHOW_ADVANCED':
            return {...state, show_advanced: action.payload}
        case 'HIDE_SUGGESTION':
            return {...state, suggestions_hidden: true}
        default:
            return state
    }
}
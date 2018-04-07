export const loaderReducer = (state=0,action) => {
    switch(action.type) {
        case 'LOADER_START':
            return state+1
        case 'LOADER_END':
            return state-1
    }
    return state
}
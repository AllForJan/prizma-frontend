import {combineReducers} from 'redux'
import {searchInputReducer} from "../search-component/search-input-reducer";
import {detailComponentReducer} from "../detail-component/detail-component-reducer";
import {loaderReducer} from "./loader-reducer";

export const appReducer = combineReducers(
    {
        searchInput: searchInputReducer,
        loading: loaderReducer,
        detail: detailComponentReducer,
    }
)

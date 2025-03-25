import { combineReducers } from "redux";
import { idsReducer } from "./ids-reducer";
import { egoReducer } from "./ego-reducer";
import { filterReducer } from "./filter-reducer";
import { tbReducer } from "./tb-reducer";
import { statusesReducer } from "./statuses-reducer";
import { leftMenuReducer } from "./left-menu-reducer";
import { searchReducer } from "./search-reducer";
import { mobileModalReducer } from "./mobile-modal-reducer";
import { mdReducer } from "./md-reducer";
import { animationReducer } from '../slices/animationSlice';

export const rootReducer = combineReducers({
    animation: animationReducer,
    idsReducer,
    egoReducer,
    filterReducer,
    tbReducer,
    statusesReducer,
    leftMenuReducer,
    searchReducer,
    mobileModalReducer,
    mdReducer
})
export type RootState = ReturnType<typeof rootReducer>
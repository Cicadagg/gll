import {applyMiddleware, legacy_createStore as createStore} from "redux";
import { rootReducer } from "./reducers/root-reducer";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
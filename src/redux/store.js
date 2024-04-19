import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice' 
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

//rootReducer that combines all reducers in one.
const rootReducer = combineReducers({
  user: userReducer,
});

//persistConfig object that contains configuration options for persisting the Redux state which control how the Redux state is serialized and stored
const persistConfig = {
  key: 'root',
  storage, 
  version: 1,
}

//persistReducer that persists and rehydrates the Redux state using the specified configuration, applies the persistConfig to the rootReducer and store it in the new variable reducer.

const persistedReducer = persistReducer(persistConfig, rootReducer);

//configureStore that configures the store.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


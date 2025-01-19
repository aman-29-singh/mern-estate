import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';//we have to install this redux-persist from client terminal
//import persistReducer from 'redux-persist/es/persistReducer';
//import { version } from 'mongoose';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
} /*isse agar page refresh bhi hogya toh bhi user ka information inspect karke application k andar localhost mein
dekh sakte hai*/
//Redux locally and globally bhi information ko store karta hai

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, //we added this 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
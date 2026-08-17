import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';

// Custom storage engine for Vite compatibility
const createWebStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(localStorage.getItem(_key));
    },
    setItem(_key, value) {
      return Promise.resolve(localStorage.setItem(_key, value));
    },
    removeItem(_key) {
      return Promise.resolve(localStorage.removeItem(_key));
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage() : null;

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
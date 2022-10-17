import {configureStore, combineReducers, compose} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './auth/authSlice';
import planReducers from './plans/planSlice';
import userReducer from './user/userSlice';
import commonReducer from './common/commonSlice';

// import extraReducer from './extra/extraSlice';
import extraReducer from './extra/extraSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  plans: planReducers,
  user: userReducer,
  common: commonReducer,
  extra: extraReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['auth', 'plans', 'user', 'common'],
  // Blacklist (Don't Save Specific Reducers)
  // blacklist: ['setting', 'upload']
  blacklist: ['extra'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;

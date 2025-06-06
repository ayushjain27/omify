import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  authReducer
});

export { rootPersistConfig, rootReducer };

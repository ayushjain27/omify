import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import paymentPageReducer from './payment-page/paymentPageSlice';
import telegramReducer from './telegram/telegramSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  authReducer,
  paymentPageReducer,
  telegramReducer
});

export { rootPersistConfig, rootReducer };

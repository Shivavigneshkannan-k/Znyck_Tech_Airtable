import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import tableReducer from './table.store.js';

const store = configureStore({
  reducer: {
    user:userReducer,
    table:tableReducer
  },
})
export default store;
// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './bikeSlice';

const store = configureStore({
  reducer: {
    bike: bikeReducer, // Sử dụng bikeReducer để quản lý bikes
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Crudslice';

const store = configureStore({
  reducer: {
    Product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import RootReducer from './RootReducer';
import { MoviesApi } from '../api';

function CreateStore() {
  const middlewares: Middleware[] = [MoviesApi.middleware];

  /* ------------- Redux Store ------------- */
  const reduxStore = configureStore({
    reducer: RootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({}).concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return { reduxStore };
}

export default CreateStore;
export type IStore = ReturnType<typeof CreateStore>;
export type IAppDispatch = IStore['reduxStore']['dispatch'];

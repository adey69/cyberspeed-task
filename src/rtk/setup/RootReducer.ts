import { combineReducers } from 'redux';
import { MoviesApi } from '../api';
import { MoviesSliceReducer } from '../slices';

const RootReducers = combineReducers({
  movies: MoviesSliceReducer,
  [MoviesApi.reducerPath]: MoviesApi.reducer,
});

export default RootReducers;
export type IRootReducer = typeof RootReducers;
export type IRootState = ReturnType<typeof RootReducers>;

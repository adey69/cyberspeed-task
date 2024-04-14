import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '../setup';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<IAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

'use client';
import { Provider } from 'react-redux';
import InitializeStore from './InitializeStore';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { reduxStore } = InitializeStore();

  return <Provider store={reduxStore}>{children}</Provider>;
}

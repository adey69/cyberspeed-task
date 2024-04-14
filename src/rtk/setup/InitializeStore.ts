import CreateStore from './CreateStore';
import RootReducers from './RootReducer';

function InitializeStore() {
  let { reduxStore } = CreateStore();

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = RootReducers;
      reduxStore.replaceReducer(nextRootReducer);
    });
  }
  return { reduxStore };
}

export default InitializeStore;

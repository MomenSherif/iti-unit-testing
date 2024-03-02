import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

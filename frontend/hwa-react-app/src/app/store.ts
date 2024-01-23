import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { samplesInventoryApi } from '../features/samples/samplesApi';
import sampleReducer from '../features/samples/sampleSlice';
export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    [samplesInventoryApi.reducerPath]: samplesInventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(samplesInventoryApi.middleware),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

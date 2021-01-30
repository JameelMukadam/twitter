import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tweetReducer from './tweetSlice';

export const store = configureStore({
  reducer: {
    tweet: tweetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

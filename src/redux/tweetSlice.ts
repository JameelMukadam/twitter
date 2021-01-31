import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import api from '../services/api';

import type { Tweet } from '../services/api';

type TweetState = {
  loading: boolean;
  saving: boolean;
  tweets: Tweet[];
  error: Error | null;
};

const initialState: TweetState = {
  loading: false,
  saving: false,
  tweets: [],
  error: null,
};

export const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    addingTweets: (state) => {
      state.loading = true;
    },
    addingTweetsError: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
    tweetsReceived: (state, action: PayloadAction<Tweet[]>) => {
      state.tweets = [...state.tweets, ...action.payload];
      state.loading = false;
    },
    startPostingNewTweet: (state) => {
      state.saving = true;
    },
    postNewTweetSuccess: (state, action: PayloadAction<Tweet>) => {
      state.saving = false;
      state.tweets = [...state.tweets, action.payload]
    },
  },
});

export const {
  addingTweets,
  addingTweetsError,
  tweetsReceived,
  startPostingNewTweet,
  postNewTweetSuccess,
} = tweetSlice.actions;

export const getTweets = (): AppThunk => async (dispatch) => {
  dispatch(addingTweets());
  try {
    const tweets = await api.getTweets();
    if (tweets.ok && tweets.data) {
      dispatch(tweetsReceived(tweets.data));
    } else throw new Error(tweets.problem!);
  } catch (err) {
    dispatch(addingTweetsError(err));
  }
};

export const postNewTweet = (tweet: Tweet): AppThunk => async (dispatch) => {
  dispatch(startPostingNewTweet());
  try {
    const postedTweet = await api.postTweet(tweet)
    if (postedTweet.ok) {
      dispatch(postNewTweetSuccess(tweet));
    } else throw new Error(postedTweet.problem!);
  } catch (err) {
    dispatch(addingTweetsError(err));
  }
}

export const selectTweets = (state: RootState) => state.tweet.tweets;
export const selectLoadingTweets = (state: RootState) => state.tweet.loading;
export const selectSavingTweet = (state: RootState) => state.tweet.saving;
export const selectLoadingTweetsError = (state: RootState) => state.tweet.error;

export default tweetSlice.reducer;

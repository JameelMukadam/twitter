import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import api from '../services/api';

import type { Tweet } from '../services/api';

type TweetState = {
  loading: boolean;
  saving: boolean;
  tweets: Tweet[];
  pageNumber: number;
  maxPageNumber: number;
  totalTweets: number;
  error: Error | null;
};

const initialState: TweetState = {
  loading: false,
  saving: false,
  error: null,
  tweets: [],
  pageNumber: 1,
  maxPageNumber: 1,
  totalTweets: 0,
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
      state.tweets = [...action.payload];
      state.loading = false;
    },
    startPostingNewTweet: (state) => {
      state.saving = true;
    },
    postNewTweetSuccess: (state, action: PayloadAction<Tweet>) => {
      state.saving = false;
      state.tweets = [action.payload, ...state.tweets]
    },
    updateMaxPageNumber:  (state, action: PayloadAction<number>) => {
      state.maxPageNumber = action.payload;
    }, 
    updateTotalTweets:  (state, action: PayloadAction<number>) => {
      state.totalTweets = action.payload;
    }, 
  },
});

export const {
  addingTweets,
  addingTweetsError,
  tweetsReceived,
  startPostingNewTweet,
  postNewTweetSuccess,
  updateMaxPageNumber,
  updateTotalTweets,
} = tweetSlice.actions;

export const getTweets = (page?: number): AppThunk => async (dispatch) => {
  dispatch(addingTweets());
  try {
    const tweets = await api.getTweets(page);
    if (tweets.headers && tweets.headers['x-total-count'] && Number(tweets.headers['x-total-count'])) {
      const totalTweets = Number(tweets.headers['x-total-count']);
      const maxPageNumber = Math.ceil(totalTweets / 10);
      dispatch(updateMaxPageNumber(maxPageNumber))
      dispatch(updateTotalTweets(totalTweets))
    }
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
export const selectPageNumber = (state: RootState) => state.tweet.pageNumber;
export const selectMaxPageNumber = (state: RootState) => state.tweet.maxPageNumber;
export const selectTotalTweets = (state: RootState) => state.tweet.totalTweets;
export const selectSavingTweet = (state: RootState) => state.tweet.saving;
export const selectLoadingTweetsError = (state: RootState) => state.tweet.error;

export default tweetSlice.reducer;

import MockAdapter from 'axios-mock-adapter';
import { Thunk, Selector, Reducer } from 'redux-testkit';
import api from '../../services/api';
import TweetReducer, {
  getTweets,
  selectTweets,
  postNewTweet,
  selectSavingTweet,
} from '../tweetSlice';

describe('Tweets Slice', () => {
  it('getTweets should get tweets from server and post actions', async () => {
    const mockedTweets = [
      {
        id: 0,
        tweet:
          'duis do in ea veniam nulla excepteur voluptate esse fugiat quis mollit occaecat Lorem adipisicing in sit ad aute occaecat',
        date: '2015-01-17',
        claps: 47,
        userId: 1,
      },
      {
        id: 1,
        tweet:
          'duis labore tempor eiusmod culpa in ex nostrud magna id qui fugiat ad commodo deserunt occaecat incididunt est proident deserunt',
        date: '2016-02-20',
        claps: 30,
        userId: 1,
      },
    ];
    const mock = new MockAdapter(api.axiosInstance);
    mock.onGet('/tweets?_page=1').reply(201, mockedTweets);
    const dispatches = await Thunk(getTweets).execute(1);
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({ type: 'tweets/addingTweets' });
    expect(dispatches[1].getAction()).toEqual({
      type: 'tweets/tweetsReceived',
      payload: mockedTweets,
    });
  });

  it('should select tweets from state', async () => {
    const mockedTweets = [
      {
        id: 0,
        tweet:
          'duis do in ea veniam nulla excepteur voluptate esse fugiat quis mollit occaecat Lorem adipisicing in sit ad aute occaecat',
        date: '2015-01-17',
        claps: 47,
        userId: 1,
      },
      {
        id: 1,
        tweet:
          'duis labore tempor eiusmod culpa in ex nostrud magna id qui fugiat ad commodo deserunt occaecat incididunt est proident deserunt',
        date: '2016-02-20',
        claps: 30,
        userId: 1,
      },
    ];
    const state = {
      tweet: {
        tweets: mockedTweets,
      },
    };
    const result = mockedTweets;
    Selector(selectTweets).expect(state).toReturn(result);
  });

  it('should handle addingTweets action', () => {
    const action = { type: 'tweets/addingTweets' };
    const result = {
      loading: true,
      tweets: [],
      error: null,
      saving: false,
      pageNumber: 1,
      maxPageNumber: 1,
      totalTweets: 0,
    };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });

  it('should handle tweetsReceived action', () => {
    const mockedTweets = [
      {
        id: 0,
        tweet:
          'duis do in ea veniam nulla excepteur voluptate esse fugiat quis mollit occaecat Lorem adipisicing in sit ad aute occaecat',
        date: '2015-01-17',
        claps: 47,
        userId: 1,
      },
      {
        id: 1,
        tweet:
          'duis labore tempor eiusmod culpa in ex nostrud magna id qui fugiat ad commodo deserunt occaecat incididunt est proident deserunt',
        date: '2016-02-20',
        claps: 30,
        userId: 1,
      },
    ];
    const action = { type: 'tweets/tweetsReceived', payload: mockedTweets };
    const result = {
      loading: false,
      tweets: mockedTweets,
      error: null,
      saving: false,
      pageNumber: 1,
      maxPageNumber: 1,
      totalTweets: 0,
    };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });

  it('should handle addingTweetsError action', () => {
    const action = {
      type: 'tweets/addingTweetsError',
      payload: new Error('some error'),
    };
    const result = {
      loading: false,
      tweets: [],
      error: new Error('some error'),
      saving: false,
      pageNumber: 1,
      maxPageNumber: 1,
      totalTweets: 0,
    };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });

  it('postTweet should post tweet to the server and post actions to update state', async () => {
    const newTweet = {
      id: 999,
      tweet:
        'this is my test post. If you are seeing this then this test post was successful',
      date: '2020-01-31',
      claps: 69,
      userId: 1,
    };
    const mock = new MockAdapter(api.axiosInstance);
    mock.onPost('/tweets', newTweet).reply(201);
    const dispatches = await Thunk(postNewTweet).execute(newTweet);
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: 'tweets/startPostingNewTweet',
    });
    expect(dispatches[1].getAction()).toEqual({
      type: 'tweets/postNewTweetSuccess',
      payload: newTweet,
    });
  });

  it('should handle startPostingNewTweet action', () => {
    const action = { type: 'tweets/startPostingNewTweet' };
    const result = {
      loading: false,
      tweets: [],
      error: null,
      saving: true,
      pageNumber: 1,
      maxPageNumber: 1,
      totalTweets: 0,
    };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });

  it('should handle postNewTweetSuccess action', () => {
    const newTweet = {
      id: 999,
      tweet:
        'this is my test post. If you are seeing this then this test post was successful',
      date: '2020-01-31',
      claps: 69,
      userId: 1,
    };
    const action = { type: 'tweets/postNewTweetSuccess', payload: newTweet };
    const result = {
      loading: false,
      tweets: [newTweet],
      error: null,
      saving: false,
      pageNumber: 1,
      maxPageNumber: 1,
      totalTweets: 0,
    };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });

  it('should select saving from state', async () => {
    const state = {
      tweet: {
        saving: true,
      },
    };
    const result = true;
    Selector(selectSavingTweet).expect(state).toReturn(result);
  });
});

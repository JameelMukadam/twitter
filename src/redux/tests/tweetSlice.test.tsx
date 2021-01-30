import MockAdapter from "axios-mock-adapter";
import { Thunk, Selector, Reducer } from "redux-testkit";
import api from "../../services/api";
import TweetReducer, { getTweets, selectTweets } from "../tweetSlice";

describe("Tweets Slice", () => {
  it("getTweets should get tweets from server and post actions", async () => {
    const mockedTweets = [
      {
        id: 0,
        tweet:
          "duis do in ea veniam nulla excepteur voluptate esse fugiat quis mollit occaecat Lorem adipisicing in sit ad aute occaecat",
        date: "2015-01-17",
        claps: 47,
        userId: 1,
      },
      {
        id: 1,
        tweet:
          "duis labore tempor eiusmod culpa in ex nostrud magna id qui fugiat ad commodo deserunt occaecat incididunt est proident deserunt",
        date: "2016-02-20",
        claps: 30,
        userId: 1,
      },
    ];
    const mock = new MockAdapter(api.axiosInstance);
    mock.onGet("/tweets").reply(201, mockedTweets);
    const dispatches = await Thunk(getTweets).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({ type: "tweets/addingTweets" });
    expect(dispatches[1].getAction()).toEqual({
      type: "tweets/tweetsReceived",
      payload: mockedTweets,
    });
  });

  it("should select tweets from state", async () => {
    const mockedTweets = [
      {
        id: 0,
        tweet:
          "duis do in ea veniam nulla excepteur voluptate esse fugiat quis mollit occaecat Lorem adipisicing in sit ad aute occaecat",
        date: "2015-01-17",
        claps: 47,
        userId: 1,
      },
      {
        id: 1,
        tweet:
          "duis labore tempor eiusmod culpa in ex nostrud magna id qui fugiat ad commodo deserunt occaecat incididunt est proident deserunt",
        date: "2016-02-20",
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

  it("should handle addingTweets action", () => {
    const action = { type: "tweets/addingTweets" };
    const result = { loading: true, tweets: [], error: null };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });

  it("should handle tweetsReceived action", () => {
    const mockedTweets = [
      {
        id: 0,
        tweet:
          "duis do in ea veniam nulla excepteur voluptate esse fugiat quis mollit occaecat Lorem adipisicing in sit ad aute occaecat",
        date: "2015-01-17",
        claps: 47,
        userId: 1,
      },
      {
        id: 1,
        tweet:
          "duis labore tempor eiusmod culpa in ex nostrud magna id qui fugiat ad commodo deserunt occaecat incididunt est proident deserunt",
        date: "2016-02-20",
        claps: 30,
        userId: 1,
      },
    ];
    const action = { type: "tweets/tweetsReceived", payload: mockedTweets };
    const result = { loading: false, tweets: mockedTweets, error: null };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });

  it("should handle addingTweetsError action", () => {
    const action = {
      type: "tweets/addingTweetsError",
      payload: new Error("some error"),
    };
    const result = {
      loading: false,
      tweets: [],
      error: new Error("some error"),
    };
    Reducer(TweetReducer).expect(action).toReturnState(result);
  });
});

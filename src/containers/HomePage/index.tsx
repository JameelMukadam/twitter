import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTweets,
  selectLoadingTweets,
  selectTweets,
  selectSavingTweet,
  selectLoadingTweetsError,
  postNewTweet,
} from '../../redux/tweetSlice';
import { Background } from './style';
import { H1, H2, ErrorText } from '../../components/Typography';
import TweetCard from '../../components/TweetCard';
import TweetInput from '../../components/TweetInput';

function HomePage() {
  const tweets = useSelector(selectTweets);
  const isLoadingTweets = useSelector(selectLoadingTweets);
  const isSavingTweet = useSelector(selectSavingTweet);
  const loadingTweetsError = useSelector(selectLoadingTweetsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  function onPostTweet(tweet: string) {
    const currentDate = new Date();
    const newTweet = {
      id: tweets.length + 1,
      date: `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`,
      claps: 0,
      userId: 1,
      tweet: tweet,
    };
    dispatch(postNewTweet(newTweet));
  }

  return (
    <Background>
      <H1>Twitter</H1>
      <br />
      <TweetInput saving={isSavingTweet} onPostTweet={onPostTweet} />
      <br />
      {loadingTweetsError && !isLoadingTweets && (
        <ErrorText>
          Error loading tweets: {loadingTweetsError.message}
        </ErrorText>
      )}
      {isLoadingTweets && <H2 data-testid="loading-tweets">Loading...</H2>}
      {tweets.map((tweet) => {
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </Background>
  );
}

export default HomePage;

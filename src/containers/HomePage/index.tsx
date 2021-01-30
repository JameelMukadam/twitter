import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTweets,
  selectLoadingTweets,
  selectTweets,
  selectLoadingTweetsError,
} from '../../redux/tweetSlice';
import { Background } from './style';
import { H1, H2, ErrorText } from '../../components/Typography';

function HomePage() {
  const tweets = useSelector(selectTweets);
  const isLoadingTweets = useSelector(selectLoadingTweets);
  const loadingTweetsError = useSelector(selectLoadingTweetsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  return (
    <Background>
      <H1>Home Page</H1>
      {loadingTweetsError && !isLoadingTweets && (
        <ErrorText>
          Error loading tweets: {loadingTweetsError.message}
        </ErrorText>
      )}
      {isLoadingTweets && <H2>Loading...</H2>}
      {tweets.map((tweet) => {
        return <H2 key={tweet.id}>{tweet.tweet}</H2>;
      })}
    </Background>
  );
}

export default HomePage;

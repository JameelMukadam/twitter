import React from 'react';
import { Container, Avatar, Content } from './style';
import { H2, Paragraph } from '../Typography';

type Tweet = {
  id: number;
  tweet: string;
  date: string;
  claps: number;
  userId: number;
};

type TweetCardProps = {
  tweet: Tweet;
};

function TweetCard({ tweet }: TweetCardProps) {
  return (
    <Container>
      <Avatar> {tweet.userId} </Avatar>
      <Content>
        <H2>UserId: {tweet.userId}</H2>
        <Paragraph>{tweet.tweet}</Paragraph>
      </Content>
    </Container>
  );
}

export default TweetCard;

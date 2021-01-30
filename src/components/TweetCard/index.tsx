import React from 'react';
import { GiHand } from 'react-icons/gi';
import { useTheme } from 'styled-components';
import { Container, Avatar, Content, Header, Footer } from './style';
import { H2, H3, Paragraph } from '../Typography';

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
  const theme = useTheme();
  return (
    <Container data-testid={`tweet-${tweet.id}`}>
      <Avatar> {tweet.userId} </Avatar>
      <Content>
        <Header>
          <H2>UserId: {tweet.userId}</H2>
          <H3>{tweet.date}</H3>
        </Header>
        <Paragraph>{tweet.tweet}</Paragraph>
        <Footer>
          <H3>{tweet.claps}</H3>
          <GiHand color={theme.colors.secondary} />
        </Footer>
      </Content>
    </Container>
  );
}

export default TweetCard;

import React, { useState } from 'react';
import { Container, Input, Button } from './style';

type TweetInputProps = {
  onPostTweet: (tweet: string) => void;
  saving: boolean;
};

function TweetInput({ saving, onPostTweet }: TweetInputProps) {
  const [tweet, setTweet] = useState<string>('');
  return (
    <Container>
      <Input
        placeholder={`What's on your mind?`}
        data-testid="tweet-input"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />
      <br />
      <Button
        data-testid="post-tweet-button"
        onClick={() => {
          if (!saving) onPostTweet(tweet);
        }}
      >
        {saving ? 'Saving..' : 'Post Tweet'}
      </Button>
    </Container>
  );
}

export default TweetInput;

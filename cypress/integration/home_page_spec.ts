import { createYield } from "typescript";

describe('View all tweets on home page', () => {
  it('Show all tweets on home page', () => {
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
    cy.intercept('/tweets', (req) => {
      return req.reply(mockedTweets);
    });
    cy.visit('/');
    cy.get(`[data-testid=loading-tweets]`).should('be.visible')
    cy.get(`[data-testid=loading-tweets]`).should('not.exist')
    mockedTweets.forEach(mockedTweet => {
      cy.get(`[data-testid=tweet-${mockedTweet.id}]`).should('be.visible')
    })
  });
});

describe('Post a new tweet', () => {
  it('should post a successful tweet and update the state', () => {
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
    const mockNewTweet = {
      id: 999,
      tweet:
        'tweet tweet',
      date: '2020-01-31',
      claps: 69,
      userId: 1,
    };
    cy.intercept('POST', '/tweets', {
      statusCode: 200,
      body: mockNewTweet
    });
    cy.intercept('GET', '/tweets', mockedTweets);
    cy.visit('/');
    cy.get(`[data-testid=tweet-input]`).should('be.visible').type('tweet tweet');
    cy.get(`[data-testid=post-tweet-button]`).should('be.visible').click();
    cy.get(`[data-testid=tweet-input]`).should('be.visible').type('tweet tweet');
    cy.get(`[data-testid=tweet-${mockedTweets.length + 1}]`).should('be.visible');
  })
})

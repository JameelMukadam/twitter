import { createYield } from "typescript";

describe('View all tweets on home page', () => {
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
  it('Show all tweets on home page', () => {
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

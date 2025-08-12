// cypress/support/commands.ts

declare global {
  // This is a valid use-case for a namespace, so we can disable the lint rule.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in a user with a mocked API response.
       * @example cy.login()
       */
      login(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.intercept('POST', '/api/auth/callback/credentials', {
    statusCode: 200,
    body: { url: '/dashboard' },
  }).as('loginRequest');

  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        accessToken: 'fake-jwt-token-for-testing',
      },
      expires: '2099-12-31T23:59:59.999Z',
      accessToken: 'fake-jwt-token-for-testing',
    },
  }).as('sessionRequest');

  cy.visit('/login');
  cy.get('input[name="email"]').type('test@example.com');
  cy.get('input[name="password"]').type('password123');
  cy.get('button[type="submit"]').click();
  cy.wait('@loginRequest');
});

// Adding this makes the file a module, which is required for 'declare global'.
export { };
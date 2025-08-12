// cypress/e2e/bookmark.cy.ts

describe('Bookmark Functionality', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/opportunities/search', { fixture: 'jobs.json' }).as(
            'getJobs'
        );
        cy.login();
    });

    it('should allow a user to bookmark and unbookmark a job', () => {
        cy.intercept('GET', '**/bookmarks', { data: [] }).as('getBookmarks');
        cy.visit('/dashboard');
        cy.wait(['@getJobs', '@getBookmarks']);

        // --- THIS IS THE FIX ---
        // Instead of using a variable that becomes stale, we will use a robust selector
        // to re-query the DOM after each action that causes a re-render.
        // Using a specific ID from our fixture is more reliable than .first().
        const cardSelector = '[href*="/jobs/job-id-1"]';

        // --- Test BOOKMARK action ---
        cy.log('Testing: bookmarking the job');
        cy.intercept('POST', '**/bookmarks/job-id-1', { statusCode: 201 }).as(
            'addBookmark'
        );

        // Step 1: Find the card, find the button inside it, and click.
        cy.get(cardSelector).find('button[aria-label="Add bookmark"]').click();

        // Step 2: Wait for the network request to finish.
        cy.wait('@addBookmark');

        // Step 3: Re-query the DOM from scratch to find the NEW card and assert its state.
        // This finds the new component that React rendered after the key change.
        cy.get(cardSelector)
            .find('button[aria-label="Remove bookmark"] svg')
            .should('have.attr', 'fill', 'currentColor');

        // --- Test UNBOOKMARK action ---
        cy.log('Testing: unbookmarking the job');
        cy.intercept('DELETE', '**/bookmarks/job-id-1', {
            statusCode: 200,
        }).as('removeBookmark');

        // Step 1: Find the card again, find the button, and click.
        cy.get(cardSelector).find('button[aria-label="Remove bookmark"]').click();

        // Step 2: Wait for the network request.
        cy.wait('@removeBookmark');

        // Step 3: Re-query the DOM one last time to find the final component and assert its state.
        cy.get(cardSelector)
            .find('button[aria-label="Add bookmark"] svg')
            .should('have.attr', 'fill', 'none');
    });

    it('should show the correct bookmarked state on initial page load', () => {
        cy.intercept('GET', '**/bookmarks', { fixture: 'bookmarks.json' }).as(
            'getBookmarksWithData'
        );
        cy.visit('/dashboard');
        cy.wait(['@getJobs', '@getBookmarksWithData']);

        const bookmarkedJobCard = cy.get('[href*="/jobs/job-id-1"]');
        bookmarkedJobCard
            .find('button[aria-label="Remove bookmark"] svg')
            .should('have.attr', 'fill', 'currentColor');
    });
});
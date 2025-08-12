/* eslint-disable @typescript-eslint/no-require-imports */ // 👈 Add this line at the top

const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/app/(.*)$': '<rootDir>/app/$1',
    },
};

module.exports = createJestConfig(customJestConfig);
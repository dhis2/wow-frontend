---
title: Way of Testing
sidebar_position: 10
---

:::danger[Draft]

This document is still in draft. You can discuss it as part of this PR: https://github.com/dhis2/wow-frontend/pull/7.

The scope of this document is automated tests _in code_; unit, integration, end to end, contract etc... in the context of the _frontend_ for platform team. It does not tackle other important aspects such as manual testing and its processes, or backend and database tests.
:::

### Why automated tests?

Why we write tests? Good tests can...

1. Verify the code is working correctly...
2. Prevent future regressions
3. Document code behaviour
4. Provides design guidance
5. Support refactoring

> Read the full article here:  https://madeintandem.com/blog/five-factor-testing/


:::warning[Discussion]

- Rank these reasons in terms of importance in our context according to you
- Any other reasons we should write tests?

:::


### The ideal scenario

(Mozafar): we have a **high coverage** of tests, _integration-like_ with the most crucial scenarios tested in a thin layer of _end to end_ tests. Regressions and breaking changes in the API are caught early by tests, and refactoring made easy.

:::warning[Discussion]

- How does the ideal scenario look for you? some other possible prompts: TDD, cucumber, contract testing, end to end, pair programming... 

:::

:::warning[Discussion]

- What should be a high coverage in our context?
- What is unit vs integration tests in the frontend?
- How to avoid breaking changes in the API?
    - Contract testing?
- Should the ideal scenario depend on the project type: UI library vs Libraries vs apps?
- How we do end to end tests?
:::

### Why do we not write tests?
When we don't write tests,

- Time pressure
- Not very confident or comfortable with writing tests..
- Cost of setting up tests when the project has none.
- Other reasons?

:::warning[Discussion]

- What are other reasons?
- What can actions can we take to address these?
:::


## Current anti-patterns

- **Inversed test pyramid**: we often over-rely on end to end testing, 

- **Brittle tests**: Tests with too many mocked dependencies that are hard to maintain and don't test integration between components.
    - **Snapshots** (discussion point): Snapshots are particularly brittle and close to implementation details.

- **Mocked responses in end to end tests**

- **No tests at all!**: For many 

:::warning[Discussion]

- What other anti-patterns?

:::


## Common patterns and best practices

This section is to document and point to common patterns and 

:::danger[ToDo]
add links and context for these patterns, and more concrete examples
:::

- End to end tests without mocked backend: Scheduler as an example
- Testing UI components with React Context: (todo examples) 
- Testing UI components with Zustand 
- Avoiding flakiness in time and date-related

### react-testing-library patterns
https://testing-library.com/docs/react-testing-library/intro/

### cypress patterns
https://docs.cypress.io/guides/references/best-practices

## Other aspects of automated tests
- Reducing flakiness
- Tests code quality
- Using Cucumber or other DSLs
- Running in CI vs local
- ....


## Readings

- [Five Factor Testing](https://madeintandem.com/blog/five-factor-testing/)
- [Write tests. Not too many. Mostly integration](https://kentcdodds.com/blog/write-tests)
- [Practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

## Proposed actions

:::danger[Proposed actions]

- ? Track code coverage to have a more precise idea of where we are

- ? Rethink e2e tests and move to docker-based solution

- ? Always add a test for bug fixes

- ...

:::
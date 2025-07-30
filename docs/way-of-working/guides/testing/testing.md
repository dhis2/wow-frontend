---
title: Way of Testing
sidebar_position: 10
---

:::danger[Draft]

This document is still in draft. You can discuss it as part of this PR: https://github.com/dhis2/wow-frontend/pull/7.

The scope of this document is automated tests _in code_; unit, integration, end to end, contract etc... in the context of the _frontend_ for platform team. It does not tackle other important aspects such as manual testing and its processes, or backend and database tests.
:::


## General approach

The general philosophy of our main testing library (react-testing-library) can be summarised by this [blog post](https://kentcdodds.com/blog/write-tests) by Kent Dodds (the creator of testing-library) and 

Testing library, and its [test philosophy](https://testing-library.com/docs/#the-problem), 

> The more your tests resemble the way your software is used, the more confidence they can give you.

> You want to write maintainable tests that give you high confidence that your components are working for your users. As a part of this goal, you want your tests to avoid including implementation details so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down.
> https://testing-library.com/docs/#the-problem

#### Don't Mock too much

> The line between integration and unit tests is a little bit fuzzy. Regardless, I think the biggest thing you can do to write more integration tests is to stop mocking so much stuff. When you mock something you're removing all confidence in the integration between what you're testing and what's being mocked..
> https://kentcdodds.com/blog/write-tests#how-to-write-more-integration-tests

#### As opposed to more mocking

An example in our codebase is the [Scheduler app](https://github.com/dhis2/scheduler-app/blob/master/src/hooks/jobs/use-update-job.test.js). This achieves high-coverage of unit tests treating UI components as isolated components. It balances that with a strong e2e test suites.


:::warning[Discussion]

- Testing UI components in isolation (mocking dependencies) vs Testing them in context (minimal mocking): what are the pros and cons?

- What is a "component" in UI context?

:::

## Common patterns from our codebase

This section is to document and point to common patterns in our DHIS2 codebase, primarily for ease of reference and reuse in new projects, but also to document and discuss our best practices and variety of approaches.

### Render helper
For integration-like test harnesses, we need to exercise the UI from a level as close as possible to what the user sees.

In practice, this means that we need to add a custom render helper to use in our tests. This pattern is well documented in testing-library here: https://testing-library.com/docs/#the-problem

Examples of these helpers can be found:

- [Wrapper with support for CustomDataProvider](https://github.com/dhis2/aggregate-data-entry-app/blob/master/src/test-utils/render.jsx#L62)

- [Helper with CustomDataProvider and React Router (and TypeScript)](https://github.com/dhis2/aggregate-data-entry-app/blob/master/src/test-utils/render.jsx#L62)

- [Helper with CustomDataProvider and a Mock Alert stack](https://github.com/dhis2/route-manager-app/blob/main/src/test-utils/render.tsx) - handy for testing alerts shown using App Platform `useAlert`.


### Testing Hooks

To keep with the general philosophy of writing tests that behave like an end-user, it's better to consider hooks as an implementation detail and test for the side effect of the hook in the UI component (i.e. test that the data returned from a `useDataQuery` is displayed, regardless of whether a hook was used or a different way of fetching data). This ensures the tests are more resilient to refactors.

Nevertheless, there are scenarios where it's easier to test the hook directly, for edge cases for example, or when the hook is a generic reusable component in its own right. For these scenarios, we've found that [@testing-library/react-hooks](https://github.com/testing-library/react-hooks-testing-library) are the way to go.

- [Example in TS](https://github.com/dhis2/multi-calendar-dates/blob/d233c27f1e12ebca07ecef5d33b676d871bfcb57/src/hooks/useResolvedDirection.spec.ts#L2)

### Mocking and spying on the API

- Using [CustomDataProvider](https://developers.dhis2.org/docs/app-runtime/advanced/customdataprovider/)
    - https://github.com/dhis2/global-shell-app/blob/main/src/components/header-bar/header-bar.prod.stories.jsx#L27
    - with a wrapper helper: https://github.com/dhis2/aggregate-data-entry-app/blob/master/src/test-utils/render.jsx
- Using [msw](https://mswjs.io/): https://github.com/dhis2/app-hub/blob/master/client/test/mocks/setup.js
- Using nock: https://github.com/dhis2/push-analytics/blob/master/src/Cluster/integration/utils/initializeMockCluster.ts

- Spying on mutations:
    - https://github.com/dhis2/route-manager-app/blob/main/src/components/route-creation/UpsertRoute.spec.tsx#L70




### Spying on navigation

- https://github.com/dhis2/route-manager-app/blob/main/src/components/route-creation/UpsertRoute.spec.tsx#L14
- ...

### End to end patterns

- End to end tests without a dockerised backend: [ Scheduler as an example](https://github.com/dhis2/workflows-platform/blob/main/.github/workflows/e2e.yml)
    - analytics tests with multiple versions
    - with [cucumber](https://github.com/dhis2/aggregate-data-entry-app/blob/master/cypress/e2e/smoke-test.feature)
    - with cucumber and Cypress: [UI library](https://martinfowler.com/testing/)
    - with PlayWright: https://github.com/dhis2-sre/im-web-client/tree/95a0aa61296d1adbc9c1154035687de56485c345/e2e


### Global state management
If possible (and it often is), don't test global state management directly - simply wait for the side effect (i.e. UI update, API call etc..) to happen and test its effect on the UI, like a user would experience it.

There are times, though, when it's easier to test the state management logic directly:

- Testing UI components with Zustand: https://github.com/dhis2/aggregate-data-entry-app/blob/master/src/shared/stores/unsaved-data-store.test.js
- Testing UI components with React Context: (todo examples) 

### Dates and avoiding flakiness in time and date-related tests

- The multi-calendar library - dealing with dates - has many examples regarding avoiding : https://github.com/dhis2/multi-calendar-dates/blob/main/src/utils/getNowInCalendar.spec.ts#L6

- Fix the time zone in `@dhis2/app-runtime` `Provider` in order to avoid differences in time formatting between environments (i.e. `moment` formatting the day in one format locally, and formatting it in US format on CI): https://github.com/dhis2/aggregate-data-entry-app/blob/5f11b0c885e6ff7b2ea0e84561ed6a2b3cc2a11b/src/test-utils/render.jsx#L45

### Mocking @dhis2/app-runtime

- Mocking `useConfig`: https://github.com/dhis2/data-exchange-app/blob/ae5fa3ae8390cf8690dabedab5f4fce46d540415/src/pages/addItem.test.jsx#L65

- Mocking (and spying on mutations): https://github.com/dhis2/route-manager-app/blob/1fe9d74d8575ff3fbe1b3546b008410d2bdd3c66/src/components/route-creation/UpsertRoute.spec.tsx#L10  

- Mocking connection status: https://github.com/dhis2/dashboard-app/blob/8aae7240e19a207fa1fb8abef1c8d75dca3f3311/src/pages/view/FilterBar/__tests__/FilterBadge.spec.jsx#L10



### Setting up code coverage

Setting up code coverage with a tool like `codecov` can help flag PRs that drop the coverage level, set a threshold for coverage etc...

- Setting up code coverage: https://github.com/dhis2/route-manager-app/commit/33befa9488867f87588572d16ab13d07b2990db6

Please note we tried using `SonarQube` but its code coverage support - at the time - was very basic compared to `codecov`.


## Current anti-patterns

- **Inversed test pyramid**: we often over-rely on end to end testing. 

- **Brittle tests**: Tests with too many mocked dependencies that are hard to maintain and don't test integration between components.
    - **Snapshots** (discussion point): Snapshots are particularly brittle and close to implementation details, but they are useful in certain scenarios.

- **Mocked responses in end to end tests**

- **No tests at all!**: this is the case especially for some legacy apps :(

:::warning[Discussion]

- What other anti-patterns?

:::


## Discussion (Group exercise)

This section is to guide a discussion about testing in our context. (This was an exercise we went through in a team meeting in Platform)

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

(?): we have a **high coverage** of tests, _integration-like_ with the most crucial scenarios tested in a thin layer of _end to end_ tests. Regressions and breaking changes in the API are caught early by tests, and refactoring made easy.

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

### Other Discussions points

- Reducing flakiness
- Tests code quality
- Using Cucumber or other DSLs
- Running in CI vs local
- ? Track code coverage to have a more precise idea of where we are
- ? Rethink e2e tests and move to docker-based solution
- ? Always add a test for bug fixes


## Readings

### The fundamentals
- react-testing-library patterns: https://testing-library.com/docs/react-testing-library/intro/
- cypress patterns: https://docs.cypress.io/guides/references/best-practices

### The opinions
- [Five Factor Testing](https://madeintandem.com/blog/five-factor-testing/)
- [Write tests. Not too many. Mostly integration](https://kentcdodds.com/blog/write-tests)
- [Practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- https://martinfowler.com/testing/
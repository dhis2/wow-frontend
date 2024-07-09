## (draft) Frontend Way of Working

This is a **proposal** to start a Frontend way of working document and acoompanying site.

> [!WARNING]
> This is _just_ a proof of concept at the moment. All content and the repo's existence itself is subject to change.

A website is deployed automatically based on the content of this repo to: [https://dhis2.github.io/wow-frontend/](https://dhis2.github.io/wow-frontend/)

### Repos Catalog
This is an automated page that lists all the public repositories on GitHub DHIS2 organisation, their ownership and their dependencies. The idea is to improve to cover and provide an overview for other aspects of our codebase, i.e. test coverage, outdated dependencies, the last commits on release branches to help with tracking backports etc...

This functionality is developed as a [docusaurus plugin](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis) that is part of this same repo. This means that the genration of the repos catalog happens once at build-time, and served then as a static page.

> [!NOTE]  
> You can override the repo's owner by adding a tag starting with "team-" to the GitHub repo (i.e. team-platform). These tags are dynamic and you can define any values (i.e. team-implementation).

### Way of Working
The way of working document is a high-level overview of how we work, and the general principles and process we follow.

This should be a live document that is updated based on frequent conversations to reflect how we work, and how want to work.

#### Development guides
Specific guides to cover how we do things in the frontend team, i.e. how we do testing, TypeScript, state management. It is a library of the many patterns we use across our frontend stack, and a place to document the latest best practice for different areas.

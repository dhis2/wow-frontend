---
title: App Platform guiding principles
---

The scope of this write-up is to document the core guiding principles behind the **App Platform toolset** to provide the means to discuss its architecture, continuously improve it, critique it and focus development efforts and our limited resources on achieving its goals and vision.

# The vision

DHIS2 is developed as a platform. This means that it can be extended and used in different contexts, not restricted to what the global software team provides. This flexibility is fundamental to the DHIS2 success story and why its use cases expanded beyond healthcare to new domains such as logistics, education and climate.

One of the main extension points for DHIS2 is by creating web applications. DHIS2 comes shipped with 20+ web applications, but also allows developers to build their own applications that integrate with the DHIS2 backend, and to even publish them to our apphub for others to install and use.

**The App Platform toolset** provides a set of tools to **_builld_**, **_run_**, **_deploy_** and **_test_** DHIS2 applications in an **easy**, **secure**, **maintainable** and **consistent** manner.

## The goals

The App Platform's goal is to make the process of developing web apps for the DHIS2 ecosystem **easy**, **secure**, **maintainable** and **consistent**.

- Easy: the toolset helps developers bootstrap a new application _fast_ and to reduce the amount of work needed to build a powerful and useful app. It achieves that goal by taking care of fundamentals such as authentication, authorisation, communication with the DHIS2 backend to help them focus on the core functionality of the web app.

- Secure: By providing centralised battle-tested (in the global core team) building blocks for communicating with the DHIS2 backend, we can focus our security efforts on these building blocks in order to have a strong foundation when it comes to the crucial aspects of the security of the web apps.

- Consistency: The toolset aims to provide a consistent user and developer experience.

  - The user experience is reflected in providing a common shell (header, login, footer) for the web applications, and a UI library that provides a consistent look and feel for applications.
  - The consistent developer experience is also reflected in providing common CLI tools, and runtime libraries that help build applications in a consistent predictable manner.

- Maintainable: the toolset aims to make it easier to maintain an app and keep it up to date with DHIS2 core with features (examples - CI integrations, feature toggling ...?). It also promotes best practices when it comes to deploying and testing the apps, and promotes the open-source principles of DHIS2 by making it easier to share and collaborate with the DHIS2 developer community to tap into that global pool of knowledge.

### The target audience

The target audience for the toolset falls into two broad categories:

- Internal developers: The global software team is responsbile of building and maintaining more than 30 applications. They are one of the main stakeholders of the toolset, and provide a closer point of contact to scrutinise it, test it and use it for a diverse set of use cases across all the applications we support.

- External developers: The external developers building DHIS2 web applications who face a lot of the same challenges we face internally, in addition to their own challenges navigating the local constraints and challenges.

# Guiding principles

## 1. Easy things should be easy, hard things should be possible

The main focus and guiding principle of the toolset is to make easy things easy. "Easy things" are fundamentals that are always necessary in a DHIS2 application such as authentication, authorisation, communicating with the backend, the shell providing the look and feel of an app, building and deploying an app etc... These should be easy tasks to achieve.

But users should be able to go beyond the easy things when necessary. For example, they should be able to integrate autentication mechanisms not supported, or extend backend communication with caching and offline-first capability or third party integration, or adjust the look and feel of the app to follow local guidelines.

## 2. Opinionated but not patronising

In order to achieve our goals of security, maintainability and consistency, a certain amount of restriction has to be applied to how developers build web apps. This is a **balancing act** where the line between being opinionated or patronising to our end-users can become very blurry.

In order to navigate that thin line, we should approach it with openness and humility to judge what's a good restriction and what isn't. Ask questions about whether a restriction (a framework feature) is necessary and adds **value** to the platform and helps achieve its goals.

We also approach this question with pragmatism: Frontend development (and many frontend developers) are always finding new and interesting ways of solving problems. More than any other development discipline, frontend is both blessed and blighted by a never-ending stream of new frameworks and ideas. Our end-users always enjoy experiencing and building things in new ways. Too much restriction and they - especially external developers - will simply choose not to use our toolset, too much freedom and they lose the benefits of our toolset.

Some questions we can ask to evaluate a new feature or :

- What value does this add to the users compared to existing open-source solutions? If we - for example - add a native platform-way to do state management, what value does this provide compared to using an open-source solution.
  - Does it help with the platform's goals: ease of building apps, maintaining them and deploying them.
- Watch out for the "Not Invented Here" syndrom - are we just dismissing other open-source solutions in order for vanity reasons, or can we really provide value
- By commiting to a new feature, we are commited to maintaining it - Are we able to do so? Is the balance of value still positive after factoring in the cost of maintenance?
  - Is this restriction going to remain relevant in a year, two years, three?

## 3. Focused on what's core to DHIS2 as a platform

Features like authentication, authorisation, the app shell are core to a DHIS2 application. They can be fiddly to implement in a secure and maintanable manner, and we're best placed to tackle these domain-specific challenges. Problems under this category, naturally, pass the previous test about them being a "good restriction" that adds value, and we are best placed to be "opinionated" about how to solve them.

Sometimes a generic feature like data fetching can have extra layers that makes it DHIS2-specific (native types from our API, handling offline-first from the platform etc...), so by adding these layers, we can bring value that justifies the effort of building and maintaining such a feature.

Some questions to ask:

- What makes this feature DHIS2-specific?
- How are people solving this issue now, and how we can improve on that experience?
- Can we provide helpful reusable domain-specific abstractions that go beyond what an open-source library would provide?

## 4. Complexity is sometimes necessary

The vision of DHIS2 is that it's flexible platform. This is a core principle for the backend and is often necessary to reflect in the frontend. That flexibility provides challenges that are not easy to tackle in the frontend context, which is - typically - already complicated with concerns that are not relevant in the backend (UX, state management, visualisations, responsiveness, accessbility).

We should aim for simplicity and not add complexity for the sake of it, but we should also not shy away from complexity when it's justified. A complex problem warrants a complex solution sometimes. For example, metadata concepts make building forms (data-entry app for example) and maintenance UIs much harder than they would in a less-generic system, the challenges of keeping the look consistent between apps might warrant complicating the build process. This is again a balancing act - in platform libraries and apps - between keeping our frontend flexible and keeping it maintainable and easy to contribute to.

That said, we should always aim to hide that complexity and abstract it away from the end-user. The developer experience should remain our focus to have a consistent and simple interface to the user, hiding away implementation details (and complexity) as much as possible.

### Scrutinise the abstractions

One complexity smell is over-abstraction: It might be tempting to add an abstraction (a facade) to abstract away all implementation details. This normally comes from a good intention that we want to change the underlying implementations without changing the API. In practice though, this often leads to over-abstraction and a facade that is too tightly coupled to the underlying API that it doesn't really provide any of the decoupling benefits.

So we should scrutinse our abstractions especially those that seem to map one-to-one to the underlying implementation - they are often unecessary and become a maintenance trap on the long run.

### Always backward-compatible

The core elements of the platform (app-platform and app-runtime) should remain backward compatible. It is very hard to know how DHIS2 and the platform are used in the field, and we should never alter expected behaviour (whether implicit or documented). If the alteration is absolutely necessary (for security reasons for example) then we should have a plan on how to communicate it, but still aim to mitigate the consequences of the changes.

This point relates to the complexity question as it could mean having to manage a more complex API, and it also relates to the question of abstractions so it should be more of a reason to scrutinise our abstractions and not add to them unnecessarily given the cost of keeping them backwards compatible.

## 5. Not every problem is solved in code.

As engineers, we might be tempted to solve every problem with code, but often, writing documentation, providing training, workshops and a platform for feedback and continuous improvement and education can achieve better and more sustainable results than writing more code.

Code is not cheap - it comes with a cost of maintenance and complexity. Whenever we add a feature to the toolset, we should think the value it adds and whether that value can be achieved using other non-code means.

---

**(next part is an overview of platform component - still WIP)**

An overview of the different components that make up the platform tools.

# The toolset

## The Core

At the core of the toolset is the App Platform. The App Platform is a unified application architecture and build pipeline to simplify and standardize application development within the DHIS2 ecosystem.

### Build-time developer tools

on your user machine to make it easier to create and maintain and build a DHIS2 aplication

#### app-platform

create-react-app (nextjs and other build tooling) wraps things like

#### Shell

#### Adapter (internal)

- depends on PWA

provides the skeleton of a DHIS2 application

- Error Boundary: top-level for catching PWA-releated errors
- Offline Provider: which exposes the offline context from @dhis2/pwa
- PWALoadingBoundary
- ServerVersionProvider
  - Loading Mask
  - LoginModal
- AppWrapper
  - Alerts
    - depends on useAlerts hook from @dhis2/app-runtime
    - depends on AlertBar and AlertStack from @dhis2/ui
  - Loader
  - ErrorBoundary
  - ConnectedHeaderBar
    - HeaderBar from @dhis2/ui
    - PWA update handling
  - useVerifyLatestUser
-

#### PWA

### CLI

cypres tests
interactinv with the API from command line

Why react?
narrow the scope of the tools we want to maintain
much more easy sharing of components and application examples between members of DHIS2

## runtime libraries (app-runtime)

### Alerts service

### Config service

### Data service

### Offline service

### Provider (internal)

### Plugin service (experimental)

## The UI library

UI components to set

## The supporting libraries

- CLI
  - cli-utils-cypress
  - cli-style
- CI & Workflows
  - workflows
  - semantic-release-npm
  - action-semantic-release
  - action-supported-legacy-versions
  - action-instance-version
  - cli-helpers-engine
- d2 i18n
- app-runtime-adapter-d2
- app-service-datastore
- prop-types
- workflow-app-verify-commits
- renovate-config
- multi-calendar-dates

The set of tools is often referred to as the App Platform. Technically, the app-platform is one project that sits in the middle of the toolset, but often, when we talk abot

> A note on "internal"
> components marked as internal here are exposed and can be consumed publicly. This is for advanced usecases (the hard parts) but for the common usecase, the "internal" components are used by the app dev tools to deliver a DHIS2 application

feature toggling?

alerts service
translations
data store - configure and save saved objects
application security
app hub publish workflow

next:

- dynamic modules (micro-frontends)
  - headerbars and common components are loaded at runtime not at build-time
- feature toggling: tal
- data caching: multiple components can request the same data and it will be cached
- offline and pwa support
- routing (nextjs )
- web hooks and server-side extensions

telemetry

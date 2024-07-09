---
title: Platform toolset components
sidebar_position: 20
tags:
    - platform
---

@todo

**(draft)**

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

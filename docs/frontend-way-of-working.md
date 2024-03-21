# Platform Frontend Way of Working (WoW)

This is a document to document our currnt way of working, where we want to improve in the short and long-term.

# Where we are now

## high-level view

In Platform Frontend, we are a team of ~6 developers responsible for over 20 apps and libraries.

The main lifecycle is the major release cycle. This used to be six months (two major releases per year), but it changed to one yearly release. Other than the major release, we have regular patches for the versions we support (last 3 versions).

We get high-level requirements from **the roadmap** that translate into projects that are delivered during the lifecycle. The roadmap responsibility falls mainly with the functional design team, tech team leads, We also maintain existing projects, and libraries that are used through the DHIS2 ecosystem internally and externally.

## From dev's perspective

Most of our projects tend to become a one-man project ("man", since we're also very lacking in diversity). This is mainly due to lack of resources, but often due to people's preference and the type of projects where having more than one person wouldn't necessary make things quicker.

The main lifecycle while developing remains the major release. We've had attempts to break these long periods into shorter spans. We tried formal methods like sprints, but also informal methods like aligning with product demos and reviews.

This causes issues with estimation (it's harder to estimate big projects) and visibility (it's hard to know what state projects are in). But it also works - we _generally_ deliver on our release commitments but with a cost.

The cost to quality is in the shape of:

- Lack of tests: we often end up sacrificing tests in order to deliver on these commitments
- Lack of knowledge sharing: people working on silos tend to become experts with certain apps or parts of the system, while others don't.
- Technical debt: taking shorcuts leads to technical debt that we don't get to tackle.

**Process-wise**, we use Jira for tickets. We have an ongoing board that is kanban-ish. We tried some sort of sprints but that didn't work mainly because work kept being in big chunks that span multiple sprints.

## cross-functional collaboration

**UX**: UX (aka Joe) tend to be involved in larger projects. They communicate wireframes and specs that guide our development work.

**Testing**: From a dev's perspective, testers tend to get involved towards the end of the release cycle. Developers do testing for the PRs when they are ready, along the code review. 

**Functional design**: There is no direct interaction with functional design between devs and functional design team typically. But they tend to collaborate closely with the tech leads, and product managers, and their input is the main driver for the roadmap

**Security**: Devs, in frontend, also don't tend to have direct contact with the security team, but we often get tickets that are security-focused.

## Type of work

## Greenfield projects
**Big** like new Data Entry app, and Maintenance app - these should have more than a developer involved.

Or **mid-size** like the new Login App, the FE components for multi-calendar support, the PWA support in app-platform.

## Brownfield projects

Maintenance of existing apps. These vary in their age, and hence, the tech stack used and its quality.

## Platform development

We maintain a large set of tools and libraries that are part of the app-platform, the UI library for example.

About 15% of our time (a completely made up guesstimation, for now) goes into maintaining these tools, improving them, and handling new situations that arise that need 

## BAU - Business as Usual

Bugs and issues related to the previous releases.


# Where we want to head

incrementally - small wins, no major shifts

## Areas covered:

- Process
    - Agile-ish
    - Pull Requests
    - Definition of Ready
    - Definition of Done
- Communication
    - Meetings
    - Patterns of communication
- Testing standards
- Security and Privacy
- Things we do relatively well:
    - Coding standards
    - Build and deployment processes (CI/CD)
    - Version control
    - Tools and technologies


## Experimentation framework


> This follows the format from ThoughtWorks for the technology radar. Check [here](https://www.thoughtworks.com/radar/faq-and-more) for an explanation.
>
> The **Hold** ring is for things that, even though they are accepted in the industry, we haven't had a good experience with.

## Process

We will attempt (again) to work in one-month sprints. This hasn't worked perfectly when it comes to the sprints themselves, as the workload was not for the team.

## Short-term


| technique | adopt | trial | assess | hold |
|--|--|--|--|--|
| Standups | | | |  |
| - Daily standups | | | | 🔴 |
| - Async standups | 🟢 | | | |
| Sprint planning | | | | |
| - Estimation | | | 🟢 | |
| - Sprint planning meeting | |  | 🟢 | |
| - Refinement | | | |
| Retrospectives | | 🟢 | | |
| Review/demo | | | | 🔴 |
| Sprints | | | | |
| - Short sprints | | | | 🔴 |
| - 1-month sprint| | 🟢 | | | 

> This follows the format from ThoughtWorks for the technology radar. Check [here](https://www.thoughtworks.com/radar/faq-and-more) for an explanation.
>
> The **Hold** ring is for things that, even though they are accepted in the industry, we haven't had a good experience with.

Short sprints of 1-2 weeks are not suitable to the way we work now. Our projects and tasks are often big, and require a lot of exploration that a shorter sprint doesn't align well. We will continue trialing with a one-month sprint, and eventually either adopt, or switch to Kanban, Scrumban or anoher approach.

Daily sprints: Given our worldwide distribution, sync daily standups wouldn't work well. We have trialled async standups (3 time per week) and they seem to work. We can continue to tweak them (adjust frequency, questions etc..) to make them better but as they stand, they work better than daily synchronous standups for our context.

Demos: We already do these as part of the demos organised by QA.


Other thoughts
- Scrum vs Kanban vs Scrumban


# Communication

We are a remote-first team. Our communication tends to be centered around these channels:

- Tuesday meetings: We have two meetings on Tuesday morning. One includes BE + FE teams, followed by one for each team separately. In the joint meeting, we

- "top-down" communication: communicating roadmap, 

- Pull Requests

- Slack

- GitHub Discussions and 

## Guidelines for effective comunication

Effective & responsible communication guidelines - Adapted from https://about.gitlab.com/handbook/communication/

1. Assume Positive Intent. Always begin with a position of positivity and grace.
1. Kindness Matters. You are looking at a screen, but you are really talking to a person. If you wouldn't say it to a person's face, do not send it to them in a text message.
1. Express Your Thoughts Responsibly and Inclusively. We live in different locations and often have very different perspectives. We want to know your thoughts, opinions, and feelings on things. We also ask you to consider the guidelines around communicating potentially sensitive topics.
1. Own It. If you say it or type it, own it. If it hurts the company or an individual, even unintentionally, we encourage you to look at things from other points of view and apologize easily.
1. Feedback is Essential. It is difficult to know what is appropriate in every one of our team members 60+ countries. We encourage team members to give feedback and receive feedback in a considerate way.
1. Do not underestimate a 1:1. Asynchronous communication (e.g., via text) is helpful and necessary. In some cases (e.g., to clarify misunderstandings) it can be much more effective to jump on a video call.
1. Focus on what we can directly influence. There are many factors we can't directly influence and we should avoid spending time discussing those things.


## Meetings
- Tuesday meetings: they are one-way mostly
- Other possible meetings
    - Retros
    - Planning
    - ad-hoc design discussions


## Pull Requests

# Testing standards

# Security and Privacy

## Defintion of Ready

## Defintion of Done



## Culture

A culture of:
- Transparency: top-down and down-to-top.
- Continuous improvement: it's not about reaching an ultimate state, but continuously improving on where we are. 
- (Pragmatism): the right balance between doing our best with the resources we have, and the lack of resources becoming a reason for never improving. 
- ?

## Discussions / Debates

- **The unbearable muddiness of the "flat hierarchy"**: are we really a flat hierarchy? can the flat hierarchy be a reason for not taking full responsibility? 



# Things not covered in this WoW

## Coding standards
https://github.com/dhis2/cli-style seems to be doing a good job in this regard. Some possible improvements:

- standards for typescript
- ?

## Build and Deployment Processe

### Version control
We use GitHub for version control and our use of it is generally quite mature.

Some open questions

- Merge strategy

### Build and Deployment Processe
- Branch protection across organisation
- PR sizes - should we be
- Move to [Renovate](https://github.com/renovatebot/renovate)

## Tools and Technologies
- We will leave the specific tools and technologies out of this document.



# Random
--
https://backstage.io/ - An open platform for building developer portals


- Spotify way of working: https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf .. https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1/

- https://en.wikipedia.org/wiki/Worse_is_better NJ vs MIT

- Conway's law / team cognitive load - https://www.thoughtworks.com/radar/techniques?blipid=202104127

- security thread modeling https://www.thoughtworks.com/radar/techniques?blipid=871


Being stuck at kick off phase:
- pair programming
- mob programming
- user story maps


Todo:
- Close sprint and start one that finishes 28th of April
- Next sprint: 2nd of May to 2nd of June
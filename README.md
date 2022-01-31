# worqplace-FrontEnd | Quintor - Hogeschool Utrecht

## Table of contents

- [Documentation](#documentation)
    - [Angular](#Angular)
- [Team](#team)
- [Git Strategy](#git-strategy)
- [Agile](#agile)
- [Coding Standards](#coding-standards)
- [Git](#git)

## Documentation

### Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

#### Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Team

This project will be made by a group of seven, each with their different strengths and weaknesses that complement
eachother.

The team has the following members:

- Milan Dol ([@MDol](https://gitlab.com/MDol))
- Said Shirre ([@Bosshi](https://gitlab.com/Bosshi))
- Gerson Mak ([@ItsGers8](https://gitlab.com/ItsGers8))
- Mees Wieman ([@meesvw](https://gitlab.com/meesvw))
- Arutun Avedisyan ([]())
- Jan-paul van der moolen ([@janpaul1999](https://gitlab.com/janpaul1999))
- Daan Docters van Leeuwen ([@D0an](https://gitlab.com/D0an))

## Git strategy

For our git strategy, we are using a modified version of git flow. In our strategy we use the following branches:

Main branch Development branch Feature branches

The only things that will go in the master branch are releases, accompanied by git tag tags (v1, v2, etc.). There is a
release at the end of every iteration.

All the development work will be done in the development branch. This is to ensure that the deployed version (master
branch) will always remain stable.

For every story or (sub)task we create a new feature branch, each team member can do whatever he wants in this branch (
rebasing, force pushing, all of it). These feature branches will be used to make Pull Requests in Github. In these PR's
there will be regular reviews to ensure high code quality.

## Agile

This project will make use of the Agile workflow, implementing the Scrum method. This can be seen from our project
boards. There is a different board for each iteration.

Currently, we use the following lanes:

Backlog (shared between iterations)
To Do In progress Done

We have added all the different types of User Stories located in our backlog, however, each different User Story also
has Sub Tasks related to that particular User Story. This way, we can assign different team members to the sub tasks.

## Folder Structure

In this project we use the standard Angular Folder Structure as defined here:

https://angular-folder-structure.readthedocs.io/en/latest/ 

By doing this, we ensure our code is easily findable and more understandable for contributors that are already familiar with Angular.

In the src/app folder you can find various subsections, such as:
- [Core Section](https://git.quintor.nl/SG-HogeschoolUtrecht/worqplace-frontend/-/tree/development/src/app/core)
- [Data Section](https://git.quintor.nl/SG-HogeschoolUtrecht/worqplace-frontend/-/tree/development/src/app/data)
- [Layout Section](https://git.quintor.nl/SG-HogeschoolUtrecht/worqplace-frontend/-/tree/development/src/app/layout)
- [Modules Section](https://git.quintor.nl/SG-HogeschoolUtrecht/worqplace-frontend/-/tree/development/src/app/modules)
- [Shared Section](https://git.quintor.nl/SG-HogeschoolUtrecht/worqplace-frontend/-/tree/development/src/app/shared)


## Git

This has been discussed many times by other people, thus it is only natural to link a clear and concise article about
this topic:

https://chris.beams.io/posts/git-commit/

The points mentioned in this article are the ones we should be using for making clear git messages.

To keep our git history clean, we don't use the `git merge` command by ourselves, instead, we rebase our `feature`
branches. No unnecessary merges from `development` to `feature/...`, only merges from the PR's in `development`.



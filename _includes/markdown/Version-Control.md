We version control all projects at SAU/CAL using [Git](http://git-scm.com/). Version control allows us to track codebase history, maintain parallel tracks of development, and collaborate without stomping out each other's changes.

### Structure

The key philosophy that drives our repository structure is *we don't version control things that are version controlled elsewhere*. This means we don't version control WordPress core files or third party plugins. 

The git repo structure is as follows *always*:

```
|- wp-content/
|  |- plugins/ ___________________________ # Include in this folder any plugin you develop or mod.
|     |- index.php _______________________ # Silence is golden
|  |- themes/ ____________________________ # Include in this folder any theme or child theme you develop or mod.
|     |- index.php _______________________ # Silence is golden
|- .gitignore ____________________________ # Standard Saucal GitIgnore file (see below)
```

.gitignore file should be

```
# Ignore everything in the root except the "wp-content" directory.
/*
!.gitignore
!wp-content/

# Ignore everything in the "wp-content" directory, except the "plugins"
# and "themes" directories.
wp-content/*
!wp-content/plugins/
!wp-content/themes/
!wp-content/index.php

# Ignore everything in the "plugins" directory, except the plugins you
# specify (see the commented-out examples for hints on how to do this.)
wp-content/plugins/*
!wp-content/plugins/index.php
# !wp-content/plugins/my-single-file-plugin.php
# !wp-content/plugins/my-directory-plugin/

# Ignore everything in the "themes" directory, except the themes you
# specify (see the commented-out example for a hint on how to do this.)
wp-content/themes/*
!wp-content/themes/index.php
# !wp-content/themes/my-theme/
# !wp-content/themes/my-child-theme/
.DS_Store

*.lessc.css
config.codekit
node_modules/
```

<h3 id="workflows">Workflows {% include Util/top %}</h3>

At SAU/CAL we consider standardizing a workflow to be a very important part of the development process. Utilizing an effective workflow ensures efficient collaboration and quicker project onboarding. For this reason we use the following workflows company-wide both for internal and client projects.

#### Commits

Commits should be small and independent items of work, containing changes limited to a distinct idea. Distinct commits are essential in keeping features separate, pushing specific features forward, or reversing or rolling back code if necessary.

##### Commit Messages

The first line of a commit message is a brief summary of the changeset, describing the expected result of the change or what is done to affect change.

```sh
git log --oneline -5

# fca8925 Update commit message best practices
# 19188a0 Add a note about autoloading transients
# 9630552 Fix a typo in PHP.md
# 2309e04 Remove extra markdown header hash
# 5cd2604 Add h3 and h4 styling
```

This brief summary is always required. It is around 50 characters or less, always stopping at 70. The high visibility of the first line makes it critical to craft something that is as descriptive as possible within space limits.

```sh
git commit -m "Add an #Element.matches polyfill to support old IE"
```

Separated from the summary by a blank line is the longer description. It is optional and includes more details about the commit and its repercussions for developers. It may include links to the related issue, side effects, other solutions that were considered, or backstory. A longer description may be useful during the merge of a feature branch, for example.

```sh
git commit

# Merge 'feature/polyfill' into gh-pages
#
# matches and closest are used to simplify event delegation:
# http://caniuse.com/#feat=matchesselector
# http://caniuse.com/#feat=element-closest
# Promise and fetch are used to simplify async/ajax functionality:
# http://caniuse.com/#feat=promises
# http://caniuse.com/#feat=fetch
```

#### Merges

In order to avoid large merge conflicts, merges should occur early and often. Do not wait until a feature is complete to merge ```master``` into it.

#### Themes

All new development should take place on feature branches that branch off ```master```. When a new feature or bugfix is complete, we will do a non-fast-forward merge (```--no-ff``` flag) from that branch to ```staging``` to verify the feature or fix on the stage environment.

When things are absolutely ready to go, we'll deploy the feature or fix by performing a non-fast-forward merge from that branch to ```master```

##### Branching

All theme projects will treat the ```master``` branch as the canonical source for live, production code. Feature branches will branch off ```master``` and should always have ```master``` merged back into them before requesting peer code review and before deploying to any staging environments.

All staging branches will branch off ```master``` as well, and should be named ```staging``` or ```stage-{environment}``` for consistency and clarity. Staging branches will never be merged into any other branches. The ```master``` branch can be merged into both staging and feature branches to keep them up-to-date.

##### Complex Feature Branches

In some cases, a feature will be large enough to warrant multiple developers working on it at the same time. In order to enable testing the feature as a cohesive unit and avoid merge conflicts when pushing to ```staging``` and ```master``` it is recommended to create a feature branch to act as a staging area. We do this by branching from ```master``` to create the primary feature branch, and then as necessary, create additional branches from the feature branch for distinct items of work. When individual items are complete, merge back to the feature branch. To pull work from ```master```, merge ```master``` into the feature branch and then merge the feature branch into the individual branches. When all work has been merged back into the feature branch, the feature branch can then be merged into ```staging``` and ```master``` as an entire unit of work.

##### Backporting Client Changes

In the event that a client or third-party developer makes a change to any file included in the repository, we'll capture the diff of their changeset and import it to our development repository by:

* Grabbing the diff of their changes (either downloading files from FTP, or some other way)
* Creating a new ```ext-XXXX``` branch off ```master``` (XXXX is an incremental number used across the repo)
* Applying the diff to the new branch
* Merging the branch to ```staging```, using a non-fast-forward merge
* Merging the branch back to ```master```, again using a non-fast-forward merge
* Archive the branch (read below)

##### Archiving Branches

This workflow will inevitably build up a large list of branches in the repository. To prevent a large number of unused branches living in the repository, we'll archive them after feature development is complete.

After a branch has been merged back to both ```staging``` and ```master``` (i.e. it's been deployed to the production site), we will:

* Check out the head of the branch
* Tag the branch as ```archive/{branch-name}```
* Push tags to Beanstalk
* Move to another branch (doesn't matter which)
* Delete the branch (both on local and Beanstalk)

The tag will allow us to easily return to the branch should we need to for any reason.

#### Plugins

Unlike theme development, the `master` branch represents a stable, released, versioned product. Ongoing development will happen in feature branches branched off a `develop` branch, which is itself branched off `master`. This pattern is commonly referred to as [the Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

##### Branching

New features should be branched off `develop` and, once complete, merged back into `develop` using a non-fast-forward merge.

##### Deploying

When `develop` is at a state where it's ready to form a new release, create a new `release/<version>` branch off of `develop`. In this branch, you'll bump version numbers, update documentation, and generally prepare your release. Once ready, merge your release branch (using a non-fast-forward merge) into `master` and tag the release:

```sh
git tag -a <version> -m "Tagging <version>"
```

> **Note:** Once a version is tagged and released, the tag must never be removed. If there is a problem with the project requiring a re-deployment, create a new version and tag to reflect the change.

Finally, merge `master` into `develop` so that `develop` includes all of the work that was done in your release branch and is aware of the current state of `master`.

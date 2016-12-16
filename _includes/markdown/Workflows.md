We consider standardizing a workflow to be a very important part of the development process. Utilizing an effective workflow ensures efficient collaboration and quicker project onboarding. For this reason we use the following workflows company-wide both for internal and client projects.

### Maintenance

Sometimes we offer our clients a maintenance service in which we are responsable of keeping WP and the plugins used on the site up to date. 

#### Onboarding

When a client signs up for the maintenance plan, a plugin list is made, and the critical ones are marked as such. This list helps us know which plugins needs special treatment or alerting when an update is available for them.

Every plugin on this list should have a short description of it's purpose on the site, and a short test case about how to test it's functionality.

For plugins that are critical to the functionality, we need to have the devs contact channels handy (support channels), and find at least one alternative plugin in case it breaks during the update, and the devs fail to provide an update/fix in a short period of time. In the case it's needed, this alternative will be offered to the client, and he must accept to install this and replace the old plugin.

This list should be compiled with the dev team that worked on the project before, and/or with the client itself, who probably know more about why they use the plugins they use (unles we started the site from the scratch).

After it's finished it's then attached to a card in the *Assets* column of the *Maintenance* board in our Breeze, along with other details, like:

* List of plugins (the file mentioned above)
* Main Dev of the project
* Project Board link
* Tech Contact on the client side (person that do some testing, knows licenses they purchase, etc)
* Schedule (day/days of the month, and preferred time window to do the updates).

#### Execution

When the schedule time comes, the maintenace agent (you) needs to do the following:

* Make sure that no third party OR the customer is working in the staging enviroment.
* In case there's an ongoing work phase on our end, make sure development is properly backed up before starting the update test.

After these things have been checked, do the following (always in staging first):

1. Create a backup of the staging enviroment (if possible, depending on hosting)

2. Make sure that staging is a fresh copy of the codebase from production (plugins, themes, settings, etc). 

3. Migrate any licenses that might be needed in order to update (eg: WooThemes licenses) to staging. This is usually known by us in the project board. If that's not the case, just contact the Tech Contact on the client side and ask them to activate the licenses in the staging enviroment so we can update. 
   
   _Note:_ If the client is ok, these licenses should be saved in the project board for future reference.

4. Make a list of plugins that have an update, and report that to the Main Dev of the project. He/She should be able to see if some of the plugins with updates are going to create conflicts with our work there.

5. After this, there can be two outcomes:

##### Conflicts found with our code

1. If the Main Dev warned about conflicts, you'll update the plugins, and ask the Main Dev to see if everything still works, or to fix any issues you may already have found.

2. After that, the Tech Contact from the client should also run tests over their normal workflows (eg: purchase funnels for different products if eCommerce), and also pay special attention to workflows that are most likely to be affected by the updated plugins (as reported by the dev team).

3. There will probably be a bit of back and forth between the dev team and the client until everything is back on track and working.

   _Note for Devs:_ Any update made, needs to be made in such way that if possible it can be deployed before the updates are applied in production, and so that the code still works before the update. This is to avoid any downtime between the plugin update and the fix deployment.

4. After everything is working in staging, the updates need to be applied again in production (NOT pushed), and any updates made by the dev team needs to be deployed as well.

5. This should be the end of the current maintenance cycle.

##### No conflicts found with our code

This doesn't mean that there won't be problems, it just means that this is usually not problems that we can anticipate from a Dev perspective. 

1. You'll update plugins, and take a quick look yourself at the site (no white pages, site seems to still be operational).

2. Ask the customer to overview their normal workflows (purchase funnels, as detailed above). 

3. If there's no problems apply the updates in production, and that's it for this cycle.

4. If there is some issues reported by the customer, then the dev team needs to be called in and quote the fix for the problem.

   _Note for Devs:_ Any update made, needs to be made in such way that if possible it can be deployed before the updates are applied in production, and so that the code still works before the update. This is to avoid any downtime between the plugin update and the fix deployment.

5. After the fix is done by the dev team, and it's ready to be deployed, the changes from the dev team are deployed, and then the plugin updates are applied in production.

6. And that's it for the maintenance cycle.

#### Testing/QA

Testing of WP major releases (4.x or x.0) should _start early on_ in staging, from the RC releases. These versions are usually available a couple weeks before the final release, meaning that there's time to do it in between 2 cycles (for monthly maintenance clients). 

As explained above there are several people involved in testing:

* _Maintenance Agent_, you're the first line of defense here against really critical errors (eg: white screens, fatal errors, etc). 
* _Main Devs_, because they know the workflow of the code we worked on, and potentially some things we didn't work on.
* _Tech Rep from client_, because they know what's the most important thing that needs to work at all times (the purchase funnel, the different product types that are important, etc). 

After all these testing barriers have been passed, we think it's safe to say that the updates are safe to be deployed (re applied manually) to production. If some error pops up, we already had the client verify the site before deploying, so we can be excused of any errors that was missed during testing.

### Version Control

We version control all projects using [Git](http://git-scm.com/). Version control allows us to track codebase history, maintain parallel tracks of development, and collaborate without stomping out each other's changes.

#### Repository Structure

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

#### Commits

Commits should be small and independent items of work. Distinct items of work are essential in keeping features separate, which will aid in reversing or rolling back commits if necessary or pushing specific features forward.

Do not wait more than a day to push commits. _Push early and push often._ Not only is it important to show progress for our work, it's also important for collaboration: when you sign off another developer may want to pick up where you left off, but this is not possible if you have not pushed up your latest work in progress.

Try to keep your commits as logically self-contained as possible. If you have made a lot of changes which you have not committed yet, you can step through the changes via `git add -p` to selectively stage chunks for committing. In this way you can group your changes into commits. Using `git add -p` is also just plain handy to stage changes for commit in general because it helps prevent accidentally committing something you do not intend; for the same reason, `git commit -a` should be avoided because you don't have the explicit step to review what you are committing. Remember you can do `git diff --staged` right before commit for one last review.

##### Commit Messages

The gist of a great commit message is this:

Capitalized, short (50 chars or less) summary

More detailed explanatory text, if necessary but most likely necessary if you want to be a good citizen! Wrap it to about 72 characters or so. In some contexts, the first line is treated as the subject of an email and the rest of the text as the body. The blank line separating the summary from the body is critical (unless you omit the body entirely); tools like rebase can get confused if you run the two together.

Write your commit message in the present tense: `"Fix bug"` and not `"Fixed bug"`. This convention matches up with commit messages generated by commands like git merge and git revert. Use the imperative mood (`"Move cursor to..."` not `"Moves cursor to..."`)

You may also see [Core Handbook on Commit Messages](https://make.wordpress.org/core/handbook/best-practices/commit-messages/)

#### Branches

All projects will treat the ```master``` branch as the canonical source for live, released, stable, production code.

Projects may have a `staging` branch off of `master` where feature branches get merged and integrated before being merged into `master`. So feature branches would be made off of `staging` if it is used in a project, but otherwise feature branches would be made off of `master`. Take a look at [understanding](https://guides.github.com/introduction/flow/) the [GitHub Flow](http://scottchacon.com/2011/08/31/github-flow.html) which is a more simplified than a more traditional [Git branching model](http://nvie.com/posts/a-successful-git-branching-model/). Compare these to help decide whether a `staging` branch is appropriate in your project.

#### Merges

In order to avoid large merge conflicts, merges should occur early and often. Do not wait until a long-in-development feature is complete to merge ```master``` into it. All merging should be done by means of pull requests, so you don't need to worry about non-fast-forward (`--no-ff`) merges.

When things are absolutely ready to go (i.e. it has passed code review and QA), we'll then merge the pull request into `master`.

##### Complex Feature Branches

In some cases, a feature will be large enough to warrant multiple developers working on it at the same time. In order to enable testing the feature as a cohesive unit and avoid merge conflicts when pushing to ```preview``` and ```master``` it is recommended to create a feature branch to act as a staging area: this is the primary feature branch. Then, as necessary, create additional branches from the feature branch for distinct items of work. When individual items are complete, merge back to the feature branch. To pull work from ```master```, merge ```master``` into the feature branch and then merge the feature branch into the individual branches. When all work has been merged back into the feature branch, the feature branch can then be merged into ```preview``` and ```master``` as an entire unit of work.

##### Branch Cleanup

This workflow will inevitably build up a large list of branches in the repository. To prevent a large number of unused branches living in the repository, we'll delete them after feature development is complete. Since all feature branches should get merged by means of pull requests, there will be a persistent reference to the original branch in the pull request. So after merging the pull request, delete the branch from Git. It can be restored later via the pull request.
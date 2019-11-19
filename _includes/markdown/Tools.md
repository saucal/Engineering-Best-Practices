The following are the tools we use at SAU/CAL. This list will grow and change over time and is not meant to be comprehensive. Generally, we encourage or require these tools to be used in favor of other ones. Rules governing tools to be used and packaged with a client site will be much stricter than those used on internal projects.

### Code Checkers

* **[PHP_CodeSniffer WordPress Coding Standards](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards)** for [PHP coding standards](../php/#code-style--documentation).
* **[ESLint](http://jshint.com/)** for JavaScript [code style](../javascript/#code-style--documentation) reporting.

### Local Development Environments

At SAU/CAL, we use [Vagrant](https://www.vagrantup.com/) to build and interact with virtual environments that match production as closely as possible. There are many different Vagrant setups and configurations available. The following setups are the only ones we support internally.

[Varying Vagrant Vagrants](https://github.com/Varying-Vagrant-Vagrants/VVV/) - Our standard Vagrant setup for client sites and local development. 

*Note:* We have a fork of VVV (available [here](https://github.com/saucal/VVV/tree/saucal_version)) which includes support for syncing database and www directories with symlinks (useful only if you use Dropbox or similar). If you're not using several computers to work, then you can ignore this fork, and use the official VVV version. If you want to give it a go, check our more detailed documentation [here](../vvv-saucal/)

### Task Runners

[Gulp](http://gulpjs.com/) - Gulp is a task runner built on Node wthat lets you automate tasks like Sass preprocessing and JS minification.

We have a [Gulp Project Boilerplate](https://github.com/saucal/project-gulp-boilerplate) that we use on several projects. Documentation available in the repo.

### Package/Dependency Managers

[Composer](https://getcomposer.org) - We use Composer for managing PHP dependencies. Usually everything we need is bundled with WordPress. Sometimes we need external libraries like "Patchwork". Composer is a great way to manage those external libraries but is not necessary on most projects

### Version Control

[Git](http://git-scm.com) - We use Git for version control. It is _critical_ that you are comfortable with Git: read [the book](https://git-scm.com/book/en/v2)! We encourage people to learn to use the command line for interacting with Git. GUI’s are permitted but none of them will be supported internally. For more information on Git:

* [Hello World | GitHub Guides](https://guides.github.com/activities/hello-world/)
* [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/)
* [Forking Projects | GitHub Guides](https://guides.github.com/activities/forking/)

[SVN](https://subversion.apache.org/) - We use SVN, but only in the context of uploading plugins to the public repository. Again, we encourage people to use the command line as we do not support GUI's internally.

### Command Line

[WP-CLI](http://wp-cli.org) - A command line interface for WordPress. This is an extremely powerful tool that allows us to do imports, exports, run custom scripts, and more via the command line. Often this is the only way we can affect a large database (WordPress.com VIP or WPEngine). This tool is installed by default on VVV and VIP Quickstart.

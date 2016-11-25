The following are the tools we use at SAU/CAL. This list will grow and change over time and is not meant to be comprehensive. Generally, we encourage or require these tools to be used in favor of other ones. Rules governing tools to be used and packaged with a client site will be much stricter than those used on internal projects.

### Code Checkers

* **[PHP_CodeSniffer WordPress Coding Standards](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards)** for [PHP coding standards](../php/#code-style).
* **[PHP MD](http://phpmd.org/) ([experimental](https://github.com/xwp/wp-dev-lib/issues/4))** for higher-level [PHP coding checks](../php/#code-style).
* **[JSHint](http://jshint.com/)** for basic [code style](../javascript/#code-style) reporting.
* **[JSCS](http://jscs.info/)** for comprehensive [code style](../javascript/#code-style) reporting and fixing.

<h3 id="local-development">Local Development Environments</h3>

At SAU/CAL, we use [Vagrant](https://www.vagrantup.com/) to build and interact with virtual environments that match production as closely as possible. There are many different Vagrant setups and configurations available. The following setups are the only ones we support internally.

[Varying Vagrant Vagrants](https://github.com/saucal/VVV/tree/saucal_version) - Our standard Vagrant setup for client sites and local development. 

*Note:* We use a fork of VVV which includes a couple more features that we think are useful.

[VIP Quickstart](https://github.com/Automattic/vip-quickstart) - A Vagrant setup meant to closely match the WordPress.com VIP environment. If you are working on a VIP project, it is good to have this installed to effectively test your website locally. We only recommend this Vagrant setup for VIP projects.

#### SAU/CAL's VVV Features

##### Sync Features

Since some developers work from several computers depending on the situation (Eg: when home on desktop, when traveling on the laptop), it's good to have the ability to keep synced the enviroment between all computers using Dropbox for example.

In order to do this we've added the ability to have a Symbolic Folder called "sync" which will allow you to keep synced several things across your VVV instances.

The structure of your VVV directory will need to be as follows:

```
|- config/ _______________________________ # Several config folders which get symlinked to 
|                                          # specific places upon provisioning.
|- database/ _____________________________ # VVV core folder
|- database_backups/ _____________________ # This is the folder where dumps from MySQL are 
|                                          # made when you do a vagrant halt, and where the 
|                                          # dumps can be loaded into the MySQL using commands 
|                                          # like db_read.
|- log/ __________________________________ # VVV core folder
|- provision/ ____________________________ # VVV core folder
|- sync/ _________________________________ # SymLink (or Junction if you're using Windows) to 
|  |                                       # a folder in your Dropbox directory. This is where
|  |                                       # the magic happens.
|  |- config/ ____________________________ # This folder can include 0 or more copies of the 
|     |                                    # config folder from the root directory, which will
|     |                                    # override the default settings.
|     |- mysql-config/ ___________________ # Example: If you have this folder here, this will
|                                          # override the mysql-config folder in the root config
|                                          # directory.
|  |- database_backups/ __________________ # This folder completely overrides the root 
|  |                                       # database_backups folder. Use it if you want to keep
|  |                                       # synced the dumps across all your VVV instances.
|  |- www/ _______________________________ # This folder will be merged with the root www folder
|                                          # of your VVV. This is because on provision, the www
|                                          # folder installs some things to the www folder 
|                                          # (wp-cli for example), and you want to keep this 
|                                          # folder with just the things you want.
|- www/ __________________________________ # This is the default WWW folder that comes with VVV.
|- .... __________________________________ # Other files
```

##### Integrated Site Provisioning

We've ported some code from [VV](https://github.com/bradp/vv) to allow provisioning the site with a simple YML file. This is mostly useful if you use the sync feature, because if you're not, you're probably better using VV since it has far more complex functionality.

We've made this because VV doesn't easily work with our sync feature.

In order to provision a site, you need to halt your vagrant (if it's running), and create the following structure in one of your www directories (if you're using sync, and want this site to be synced, create it in the www folder there).

```
|- my-new-site/ __________________________ # This is just an example, name it in a slug 
|  |                                       # friendly way (only lower case letters, and dashes).
|  |- vvv-provision.yml __________________ # This file will trigger provision and sets up 
|                                          # some settings for the provisioner.
```

The *vvv-provision.yml* file support the following options (everything is optional):

```
---
domain: new-site-domain.dev                # Domain to be used to access the site locally. Default: {folder-name}.dev.
multisite: false                           # Enable multisite (subfolder). Default: false
add_content: false                         # Load test content (useful for theme development). Default: false
locale: en_US                              # Locale to install. Default: en_US
db_name: new-site-database                 # Database name to create. Default: {folder-name}
admin_user: admin                          # User login for wp-admin. Default: admin
admin_pass: test1234                       # User pass for wp-admin. Default test1234
admin_mail: test@saucal.com                # User mail for wp-admin. Default test@saucal.com
```

*Note:* if you just want to use all defaults, create the file and just put the following.

```
---
```

In order to trigger processing of the above provisioning of sites, you need to run `vagrant up --provision`

#### Porting sites from other enviroments to VVV (WIP)

This is a draft of how to move from your current enviroment (MAMP, XAMPP, EasyPHP, etc) towards VVV.

1. Copy your MySQL dump and root directory (where wp-config.php, wp-content, wp-admin, etc is) to the proper directory:
	* MySQL dump -> database_backup directory (sync or root, whatever you're using).
	* root directory -> www (sync or root, whatever you're using).

2. Log in to your vagrant via SSH (`vagrant ssh` command)

3. Execute the following command `db_read {name-of-dump}`. Eg: if your MySQL dump name is my-site.sql, execute `db_read my-site`. 
	* PS: This comand will erase any previous content in the database (if it exists), and read the dump as a full.
	* PS2: This command allows you to specify as many database as you need, so you can load as much databases as you need at once.

4. Decide what domain you'll use to access the site locally. Eg: my-crazy-site.dev

5. Create the proper nginx conf file in the nginx-conf/sites folder (either the one under the root config folder or one in the sync folder, whatever you're using).
	* You can copy the example file `local-nginx-example.conf-sample` and change the domain and root of your site.
		* Remember that the root is this `/srv/www/{folder-name}`, where `{folder-name}` is the name of your root directory within the www folder.

6. Create a file named vvv-hosts in the root directory, and inside it write solely the domain name you'll be using.

7. Edit wp-config file to match the db user and db password with the ones from vagrant. By default, it's user: `root`, pwd: `root`.

8. If the site you're porting is a multisite you'll also need to do the following:
	* Edit the multisite constants `DOMAIN_CURRENT_SITE` and `PATH_CURRENT_SITE`, to match the new domain and path you'll be using for the site.
	* Edit `wp_site`, `wp_sitemeta` and `wp_blogs` tables to match the new domain and path for every site, and subsite.

9. Do a search and replace using WP-CLI to replace any reference to the old URL of the site, and make it point to the new URL.
	1. Being logged in to your vagrant through SSH, you need to go to the root of your site. Which you can do by doing `cd /srv/www/{folder-name}`.
	2. After that you need to do the following `wp search-replace "{old_url}" "{new_url}" --precise --all-tables --dry-run`, replacing `{old_url}` with a protocol-less version of the old url, and `{new_url}` with a protocol-less version of the new URL.
		* Eg: If your old URL was `http://127.0.0.1/my-site`, you need to use `//127.0.0.1/my-site` as `{old_url}`. Same logic applies to the new URL, if your chosen domain is `my-crazy-site.dev`, use `//my-crazy-site.dev` as `{new_url}`
	3. The above command, will show how many replaces will be made. Normally most of the replaces will be in the wp_posts table, wp_options, and maybe wp_comments if you have any.
	4. If the replaces shown by the previous command look nice, run it again, but now without the `--dry-run` option, which will make it actually perform the changes.

10. After this, halt your vagrant by getting out of the SSH by typing `exit`. After that, you should be able to run `vagrant halt`.

11. Once the vagrant is halted, you need to trigger provision by running `vagrant up --provision`

After the provision finishes, your site should be accesible in the domain you chose.

#### Notes about installation of Vagrant and VVV

You can pretty much follow the installation process detailed [here](https://github.com/saucal/VVV/tree/saucal_version#installation---the-first-vagrant-up).

<h3 id="task-runners">Task Runners {% include Util/top %}</h3>

[Grunt](http://gruntjs.com/) - Grunt is a task runner built on Node that lets you automate tasks like Sass preprocessing and JS minification.

[Gulp](http://gulpjs.com/) - Another task runner also built on Node which is a newer alternative to Grunt. See [comparison](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4).

<h3 id="package-managers">Package/Dependency Managers</h3>

[Bower](http://bower.io/) - A good tool to manage front end packages. Usually everything we need is bundled with WordPress. Sometimes we need something like "Chosen.js" that isn’t included. Bower is a good way to manage external libraries like that but is not necessary on most projects.

[Composer](https://getcomposer.org) - We use Composer for managing PHP dependencies. Usually everything we need is bundled with WordPress. Sometimes we need external libraries like "Patchwork". Composer is a great way to manage those external libraries but is not necessary on most projects

<h3 id="version-control">Version Control {% include Util/top %}</h3>

[Git](http://git-scm.com) - We use Git for version control. It is _critical_ that you are comfortable with Git: read [the book](https://git-scm.com/book/en/v2)! We encourage people to use the command line for interacting with Git. GUI’s are permitted but will not be supported internally. For more information on Git:

* [Hello World | GitHub Guides](https://guides.github.com/activities/hello-world/)
* [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/)
* [Forking Projects | GitHub Guides](https://guides.github.com/activities/forking/)

[SVN](https://subversion.apache.org/) - We use SVN, but only in the context of WordPress.com VIP. Again, we encourage people to use the command line as we do not support GUI's internally.

<h3 id="command-line">Command Line Tools</h3>

[WP-CLI](http://wp-cli.org) - A command line interface for WordPress. This is an extremely powerful tool that allows us to do imports, exports, run custom scripts, and more via the command line. Often this is the only way we can affect a large database (WordPress.com VIP or WPEngine). This tool is installed by default on VVV and VIP Quickstart.

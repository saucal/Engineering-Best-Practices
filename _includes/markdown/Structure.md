<h3 id="modular-code">Modular Code</h3>

Every project-whether a plugin, a theme, or a standalone library—should be coded to be reusable and modular. The line between a theme and a plugin is often fuzzy in the WordPress community, but there should be a clear distinction between the two.

#### Themes

Themes should only handle presentation: templates, layouts, styles, and configuration (registering sidebars, menu locations, theme support, etc).

Any theme dependencies on functionality plugins should be built with the use of `do_action()` or `apply_filters()`. Changing to the default theme should not trigger errors on a site; the theme can function when the functionality plugin is disabled, broken, or missing. Nor should disabling a functionality plugin - every piece of code should be decoupled and use standard WordPress paradigms (hooks) for interacting with one another.

Any logic in the theme's `functions.php` should be simple and directly related to presentation; any other logic should be put into a plugin (e.g. post types, taxonomies, rewrite rules).

#### Plugins

A site's custom functionality should be provided by plugins. Plugins should be as generic and reusable as possible. Plugins should do one thing and do them well.

Each plugin should operate within its own namespace, both in terms of code isolation and in terms of internationalization.

Plugins should be standalone yet extensible. Plugins should provide extension hooks that allow other plugins to build upon their functionality. As such, plugins can have dependencies, although they should not cause an error if activated without the dependent plugin being active.

Any functions the plugin exposes for use in a theme should be done so through actions and filters - the plugin should contain multiple calls to `add_filter()` and `add_action()` as the hooks themselves will be defined in the theme.

<h3 id="file-organization">File Organization {% include Util/top %}</h3>

#### Themes

Every theme directory, should have this basic structure.

```
|- assets/
|  |- images/ ____________________________ # Theme images
|  |- fonts/ _____________________________ # Custom/hosted fonts
|  |- js/
|  |- css/
|- includes/ _____________________________ # PHP classes and files
|- languages/ ____________________________ # Translations
```

#### Plugins

We use a fork of the [WordPress Plugin Boilerplate](https://github.com/saucal/WordPress-Plugin-Boilerplate), and we have a tool to generate a plugin folder for each project quickly [here](http://bitcoinlabs.saucal.com:3456/) (instead of you having to perform replaces).

<h3 id="integrations">Third-Party Integrations</h3>

Any and all third-party integrations need to be documented in an `INTEGRATIONS.md` file at the root of the project repository. This file includes a list of third-party services, which components of the project those services power, how the project interacts with the remote APIs, and when the interaction is triggered.

For example:

```
## CrunchBase
Remote service for fetching funding and other investment data related to tech startups.

### Scheduling
- The CrunchBase API is used via JS in a dynamic product/company search on post edit pages
- Funding data is pulled every 6 hours by WP Cron to update cached data

### Integration Points
- /assets/js/src/crunchbase-autocomplete.js
- /includes/classes/crunchbase.php
- /includes/classes/cron.php

### Development API
- See http://somesitethatrequireslogin.com/credentials-for-project
```

#### API Keys and Credentials

Authentication credentials and API keys should _never_ be hard-coded into a project. Hard-coding production credentials leads to embarrassing eventualities like posting development content to Twitter or emailing such content to clients' mail lists.

Where possible, the project should expose a UI for entering and managing third party credentials.

If a management UI is impossible due to the nature of the project, credentials should be loaded via either PHP constants or WordPress filters. These options can - and should - default to developer credentials in the absence of production data.

```php
<?php
// Production API keys should ideally be defined in wp-config.php
// This section should default to a development or noop key instead.
if ( ! defined( 'CLIENT_MANDRILL_API_KEY' ) && ! ENV_DEVELOPMENT ) {
	define( 'CLIENT_MANDRILL_API_KEY', '1234567890' );
}
```

The `ENV_DEVELOPMENT` constant should always be set to `true` for local development and should be used whenever and wherever possible to prevent production-only functionality from triggering in a local environment.

The location where other engineers can retrieve developer API keys (i.e. Basecamp thread) can and should be logged in the `INTEGRATIONS.md` file to aid in local testing. Production API keys must _never_ be stored in the repository, neither in text files or hard-coded into the project itself.

### Modular Code

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

### File Organization

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

Plugins that provides small mods/extensions to several other plugins should be named **{project}-customizations**. Eg: `saucal-customizations`. 

As soon as the functionality being extended is large, or very focused on a specific plugin, this code should be in a separate plugin, and named **{project}-{descriptive-slug}**. Eg: `saucal-gforms-custom-field`.

### Third-Party Integrations

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

Production API keys must _never_ be stored in the repository, neither in text files or hard-coded into the project itself.

We do a lot of WooCommerce work, so first and foremost you need to follow all the [PHP Best Practices]({{ site.baseurl }}/php/) listed under our PHP section.

On WooCommerce there's several things that need to be taken into account beside these to have the most compatibility, here's a few of them.

### Performance

#### Always use data stores classes

Since WooCommerce 3.0 there's data stores implemented in WC, which have set up the way to more performant ways of storing the data (custom tables).

Therefore, **DON'T DO** this: 

```php
// Instantiate order object
$order = get_post( $order_id );

// Get Meta Data
$custom_data = get_post_meta( $order->ID, 'custom_meta_field', true );

// Update Meta Data
update_post_meta( $order_id, 'other_meta', $some_value );
```

And **DO** this:

```php
// Instantiate order object
$order = wc_get_order( $order_id );

// Get Meta Data
$custom_data = $order->get_meta( 'custom_meta_field' );

// Update Meta Data
$order->update_meta_data( 'other_meta', $some_value );
$order->save(); // Don't forget this when changing something on the order!!.
```

#### Use WooCommerce functions instead of WordPress ones

Lets say you want to get settings for some WooCommerce extension.

**DON'T DO**

```php
$taxes_enabled = get_option( 'woocommerce_calc_taxes' ) == 'yes';
$orders_endpoint = get_option( 'woocommerce_myaccount_orders_endpoint', 'orders' );
```

**DO**
```php
$taxes_enabled = wc_tax_enabled()
$endpoints = wc_get_account_menu_items();
$orders_ednpoint = $endpoints['orders'];
```

### Documentation Sources

- **[WooCommerce Classes](https://docs.woocommerce.com/wc-apidocs/index.html)** - Use the sidebar to navigate this documentation.
- **[WooCommerce Hooks](https://docs.woocommerce.com/wc-apidocs/hook-docs.html)** - Comprehensive list of filters available.
- **[WooCommerce GIT Repository](https://github.com/woocommerce/woocommerce)** - Here you'll be able to easily navigate WooCommerce's code base to understand how the code works under a specific section to maybe find clever ways to work around limitations.
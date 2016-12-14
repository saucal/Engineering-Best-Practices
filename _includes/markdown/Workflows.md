We consider standardizing a workflow to be a very important part of the development process. Utilizing an effective workflow ensures efficient collaboration and quicker project onboarding. For this reason we use the following workflows company-wide both for internal and client projects.

### Maintenance

Sometimes we offer our clients a maintenance service in which we are responsable of keeping WP and the plugins used on the site up to date. 

#### Onboarding

When a client signs up for the maintenance plan, a plugin list is made, and the critical ones are marked as such. This list helps us know which plugins needs special treatment or alerting when an update is available for them.

This list is then attached to a card in the *Assets* column of the *Maintenance* board in our Breeze, along with other details, like:

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

As explained above there are several people involved in testing:

* _Maintenance Agent_, you're the first line of defense here against really critical errors (eg: white screens, fatal errors, etc). 
* _Main Devs_, because they know the workflow of the code we worked on, and potentially some things we didn't work on.
* _Tech Rep from client_, because they know what's the most important thing that needs to work at all times (the purchase funnel, the different product types that are important, etc). 

After all these testing barriers have been passed, we think it's safe to say that the updates are safe to be deployed (re applied manually) to production. If some error pops up, we already had the client verify the site before deploying, so we can be excused of any errors that was missed during testing.
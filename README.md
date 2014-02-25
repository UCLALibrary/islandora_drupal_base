# Islandora Drupal Base

Base Drupal instance for all DLP projects. This should be the starting point for setting up a new Drupal project. After cloning this and installing its default database, a [multisite template](https://github.com/UCLALibrary/islandora_drupal_subsite_template) can be cloned and used as the base for a new site within this Drupal instance.  There are instructions for this process on the subsite template repository's wiki.

# Notes

## Patches

Upon multiple install/enable/disable cycles of the Entity Reference module (7.x-1.1), errors were encountered such as:

<code>
PHP Fatal error:  Call to undefined function entityreference_get_behavior_handlers()<br>
in modules/contrib/entityreference/entityreference.install on line 44
</code>

Similar issues were reported here: https://drupal.org/node/1836106

The patch at https://drupal.org/files/1836106.patch was applied in the entityreference module directory:

<code>
patch -p1 < 1836106.patch
</code>

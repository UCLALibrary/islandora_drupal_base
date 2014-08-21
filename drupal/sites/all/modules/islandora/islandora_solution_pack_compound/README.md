# Compound Object Solution Pack [![Build Status](https://travis-ci.org/Islandora/islandora_solution_pack_compound.png?branch=7.x)](https://travis-ci.org/Islandora/islandora_solution_pack_compound)

## Introduction

The Islandora Compound Object Solution Pack enables generic parent-child relationships between objects. The object view of a compound object is replaced by the view of its first child object. The included "Islandora Compound Object Navigation" block provides a thumbnail navigation of an object's siblings. A "Compound" management tab allows for the addition and removal of parent and child objects for each object.


## Installation

Install as usual, see [this](https://drupal.org/documentation/install/modules-themes/modules-7) for further information.

If utilizing the lazy loading image ability of the solution pack, the [JAIL](https://github.com/sebarmeli/JAIL)
library must be present within sites/all/libraries/JAIL.

## Configuration

Set the 'Child releationship predicate' and 'Solr filter query', as well as select options in Administration » Islandora » Solution pack configuration » Compound Object Solution Pack (admin/islandora/solution_pack_config/compound_object).

Optionally, enable the JAIL compound block to utilize the lazy loading image
ability as outlined below.

![Configuration](https://camo.githubusercontent.com/6862e3106b3ec20c7ad08ec8334f521a569e8bff/687474703a2f2f692e696d6775722e636f6d2f6758394b48754d2e706e67)

**Block**:

There exists two block options for displaying compound objects within Islandora.
The default "Islandora Compound Object Navigation" block will provide navigation
controls and loading of all objects related to the parent compound. The latter
option is a block utilizing the [JAIL](https://github.com/sebarmeli/JAIL)
library which allows for lazy loading of images. This allows the block to load
images only when they are being accessed which will greatly increase performance
on compounds with many children.

**Theme**:

The "Islandora Compound Object Navigation" block can be themed. See `theme_islandora_compound_prev_next()`.

**Drush**:

A Drush command has been added, to be run from the command line (Terminal), that will update the existing rel-predicate of existing compound objects to `isConstituentOf`. It can be run with the drush command `drush update_rels_predicate`. This command accpets no arguments.

## Troubleshooting/Issues

Having problems or solved a problem? Check out the Islandora google groups for a solution.

* [Islandora Group](https://groups.google.com/forum/?hl=en&fromgroups#!forum/islandora)
* [Islandora Dev Group](https://groups.google.com/forum/?hl=en&fromgroups#!forum/islandora-dev)

## Maintainers/Sponsors
Current maintainers:

* [Alan Stanley](https://github.com/ajstanley)

## Development

If you would like to contribute to this module, please check out our helpful [Documentation for Developers](https://github.com/Islandora/islandora/wiki#wiki-documentation-for-developers) info, as well as our [Developers](http://islandora.ca/developers) section on the Islandora.ca site.

## License

[GPLv3](http://www.gnu.org/licenses/gpl-3.0.txt)

# Islandora Saxon
<!--[![Build Status](https://travis-ci.org/ksclarke/islandora_saxon.png?branch=7.x)](https://travis-ci.org/ksclarke/islandora_saxon)-->

## Introduction

A simple module to allow Saxon to be selected for XSLT 2.0 processing.

## Requirements

This module requires the following modules/libraries:

* [Islandora](https://github.com/islandora/islandora)
* [Saxon/C](https://github.com/ksclarke/saxon-c)

This module is supported by the following modules (after I send the pull request and it's accepted):

* [Islandora Paged TEI Seadragon Viewer](https://github.com/discoverygarden/islandora_paged_tei_seadragon)

## Installation

Islandora Saxon can be [installed like any other Drupal module](https://drupal.org/documentation/install/modules-themes/modules-7). You'll also need to install Saxon/C before you'll be able to take advantage of XSLT 2.0 stylesheets.  At this time, you need to use [a particular fork of Saxon/C](https://github.com/ksclarke/saxon-c), but this will change when Saxon addresses [issue 2380](https://saxonica.plan.io/issues/2380) and releases a stable version.

For convenience, I provide an installation script in [my forked Saxon/C repository](https://github.com/ksclarke/saxon-c).  You should check that repository out, change into the project directory, and run install.sh.  See that repository for more detailed instructions.

## Configuration

Enable Saxon in Administration » Islandora » Islandora Utility Modules » Saxon (admin/islandora/tools/saxon).

![Configuration](https://raw.githubusercontent.com/ksclarke/islandora_saxon/7.x/docs/images/islandora_saxon.png)

## Troubleshooting/Issues

Having problems or solved a problem? Check out the Islandora google groups for a solution.

* [Islandora Group](https://groups.google.com/forum/?hl=en&fromgroups#!forum/islandora)
* [Islandora Dev Group](https://groups.google.com/forum/?hl=en&fromgroups#!forum/islandora-dev)

## Maintainers/Sponsors

Current maintainers:

* [Kevin S. Clarke](https://github.com/ksclarke)

## Development

If you would like to contribute to this module, please check out our helpful [Documentation for Developers](https://github.com/Islandora/islandora/wiki#wiki-documentation-for-developers) info, as well as our [Developers](http://islandora.ca/developers) section on the Islandora.ca site.

## License

[GPLv3](http://www.gnu.org/licenses/gpl-3.0.txt)

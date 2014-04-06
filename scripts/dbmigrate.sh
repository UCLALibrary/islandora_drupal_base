#! /bin/bash

##
# This script massages a database file to fix things hard-coded in Drupal.
# It can be used for moving a standalone Drupal instance into a multisite
# or for moving Drupal databases between different machines.  The 'from'
# and 'to' arguments can be the same if you're not moving across machines.
#
# Written By: Kevin S. Clarke <ksclarke@gmail.com>
# Last Updated: 02/04/2014
##

#
# Check for the expected arguments to this script
#

if [ ! -f "$1" ]; then
    echo "  Please supply a database file to update"
    echo "    Usage: ./dbmigrate mysql_db.sql lit250v digital-dev"
    exit 1
fi

if [ -z "$2" ]; then
    echo "  Please supply a 'from' Drupal instance"
    echo "    Usage: ./dbmigrate mysql_db.sql lit250v digital-dev"
    exit 1
fi

if [ -z "$3" ]; then
    echo "  Please supply a 'to' Drupal instance"
    echo "    Usage: ./dbmigrate mysql_db.sql lit250v digital-dev"
    exit 1
fi

#
# Make our changes to the database file after backing it up
#

# The basics...
cp $1 ./${1}.backup
sed -i '$d' $1

# Changes made when moving between machines
sed -i -e "s/${2}.library.ucla.edu/${3}.library.ucla.edu/g" $1

# Changes made when converting a standalone site into a multisite
sed -i -e 's/\/aqueduct\/sites\/default\/files\//\/aqueduct\/sites\/drupal_site_4\/files\//g' $1

# Specific site can catch more than we like
#sed -i -e 's/\/sites\/default\/files\//\/sites\/drupal_site_7\/files\//g' $1
#sed -i -e 's/\/sites\/all\/themes\//\/sites\/drupal_site_7\/themes\//g' $1

#
# Output the next steps the user needs to take
#

echo "  Database file successfully updated"
echo ""
echo "  After you reload the database, you'll need to clear Drupal's cache:"
echo "    sudo -u devUser1 drush -y -r /var/www/drupal -l @sites cc all"

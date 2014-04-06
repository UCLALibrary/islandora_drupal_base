#! /bin/bash

###########################################################
# Script Jenkins can run to finalize a new code update    #
#                                                         #
# Written by: Kevin S. Clarke <ksclarke@library.ucla.edu> #
###########################################################

DRUPAL_SITES="default drupal_site_1 drupal_site_2 drupal_site_3 drupal_site_4 drupal_site_5 drupal_site_7"
WEB_USER=apache
DRUPAL_HOME=/var/www/drupal

if [ $# -eq 1 ] ; then
  DRUPAL_SITES="$1"
fi

# Still need to do this though...
find /var/www/drupal -name files | xargs sudo chown -R apache:apache

# Reinstate original state of Drupal modules
for SITE in ${DRUPAL_SITES}
do
  drush --verbose -y --root=${DRUPAL_HOME} -l ${SITE} en `cat ${DRUPAL_HOME}/${SITE}-modules.txt`
  if [ $? -ne 0 ] ; then
    exit $?
  fi
  drush -y --root=${DRUPAL_HOME} -l ${SITE} en features
  drush -y --root=${DRUPAL_HOME} -l ${SITE} fr-all --force
  if [ $? -ne 0 ] ; then
    exit $?
  fi
  drush -y --root=${DRUPAL_HOME} -l ${SITE} updatedb
  if [ $? -ne 0 ] ; then
    exit $?
  fi
  drush -y --root=${DRUPAL_HOME} -l ${SITE} cc all
  if [ $? -ne 0 ] ; then
    exit $?
  fi
done

#! /bin/bash

###########################################################
# Script Jenkins can run to finalize a new code update    #
#                                                         #
# Written by: Kevin S. Clarke <ksclarke@library.ucla.edu> #
###########################################################

DRUPAL_SITES="default drupal_site_1 drupal_site_7"
WEB_USER=apache
DRUPAL_HOME=/var/www/drupal

if [ $# -eq 1 ] ; then
  DRUPAL_SITES="$1"
fi

# Still need to do this though...
find $DRUPAL_HOME -name files | xargs sudo chown -R apache:apache
find $DRUPAL_HOME -name settings.php | xargs sudo chown devUser1:apache

for FILE in $(find $DRUPAL_HOME -name files); do
  sudo find $FILE -type d -exec chmod 775 {} +
done

for FILE in $(find $DRUPAL_HOME -name files); do
  sudo find $FILE -type f -exec chmod 664 {} +
done

# Turn Drupal modules for the site back on again
for SITE in ${DRUPAL_SITES}
do
  drush --verbose -y --root=${DRUPAL_HOME} -l ${SITE} en `cat /etc/drupal/${SITE}-modules.txt`
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
  drush -y --root=${DRUPAL_HOME} -l ${SITE} cron
  drush -y --root=${DRUPAL_HOME} -l ${SITE} vset --exact islandora_saxon_enable_saxon TRUE
done

#! /bin/bash

###########################################################
# Script Jenkins can run to prep for a new code update    #
#                                                         #
# Written by: Kevin S. Clarke <ksclarke@library.ucla.edu> #
###########################################################

DRUPAL_SITES="default drupal_site_1 drupal_site_7"
JENKINS_USER=devUser1
WEB_USER=apache
DRUPAL_HOME=/var/www/drupal

# Create the module directory if it doesn't already exist
if [ -n "$1" ] ; then
  if [ ! -e "$1" ] ; then
    FILE_PATH=`echo $1 | sed -e 's/[^a-zA-Z0-9\-\/]/_/g'`
    sudo mkdir -p "$DRUPAL_HOME/$FILE_PATH"
    if [ -e "$FILE_PATH" ] ; then
      echo "New module directory created: $FILE_PATH"
    fi
  fi
fi

# Change ownership of specified files and dirs to our user
echo "Changing ownership of ${DRUPAL_HOME}/${1} to ${JENKINS_USER}"
sudo chown -R ${JENKINS_USER}:${WEB_USER} ${DRUPAL_HOME}/${1}
if [ $? -ne 0 ] ; then
  exit $?
fi

# Second variable set means we're installing a subsite; symlink its profile
if [ $# -eq 2 ] ; then
  DRUPAL_SITES="$2"
  if ! [ -L $DRUPAL_HOME/profiles/$DRUPAL_SITES ]; then
    ln -s $DRUPAL_HOME/sites/$DRUPAL_SITES/profile $DRUPAL_HOME/profiles/$DRUPAL_SITES
  fi
fi

# Turn off all the Drupal modules (that can be turned off) before proceeding
# Note: the db for the new site should have already been set up
for SITE in ${DRUPAL_SITES}
do
  drush -y -r ${DRUPAL_HOME} -l ${SITE} pml --status=enabled --type=module --no-core --pipe > ${DRUPAL_HOME}/${SITE}-modules.txt
  if [ $? -ne 0 ] ; then
    exit $?
  fi
  drush -y -r ${DRUPAL_HOME} -l ${SITE} dis `cat ${DRUPAL_HOME}/${SITE}-modules.txt`
  if [ $? -ne 0 ] ; then
    exit $?
  fi
  rm ${DRUPAL_HOME}/${SITE}-modules.txt
done

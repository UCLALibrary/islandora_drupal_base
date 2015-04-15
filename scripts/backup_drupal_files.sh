#! /bin/bash

#
# A simple script to copy the multisite Drupal 'files' directories to
# a file system that is being backed up. It assumes the Drupal dir is
# located at: /var/www/drupal
#
BACKUP_DIR=/usr/local/fedora/data/drupal_files
FILES_DIRS=$(find /var/www/drupal -name files)

for DIR in $FILES_DIRS; do
  NAME=${DIR//\//_}
  NAME=${NAME:16}
  rsync -r $DIR/ $BACKUP_DIR/$NAME
done

#! /bin/bash

###########################################################
#
# Script to update modules in Islandora dir
#
# Description :
#	Simple helper script to pull used Islandora
#	modules from github and update the local Islandora
#	module Drupal dir. This is NOT required but rather
#	should be used as a one time process when pulling
#	a new copy of the base Drupal repo.
#
#	The purpose is to restore the .git dir within each
#	repo for manipulation and individual repo update,
#	if desired.
#
###########################################################

WEB_USER=apache
WEB_GROUP=apache

# Check that we're running from the project base or scripts directory
if [[ ! -f ./islandora_modules.txt ]]; then
    if [[ -d ./scripts ]]; then
        cd scripts
    else
        echo "Needs to be run from the project or 'scripts' directory"
        exit 1
    fi

# Setting the WEB_GROUP user depending on distro being used
DISTRIB_ID=`lsb_release -i |awk ' { print $3 }'`

if [[ "$DISTRIB_ID" == 'RedHatEnterpriseServer' ]] \
	|| [[ "$DISTRIB_ID" == 'RedHat' ]] \
	|| [[ "$DISTRIB_ID" == 'Fedora' ]] \
	|| [[ "$DISTRIB_ID" == 'CentOS' ]]; then
	WEB_GROUP="apache"
elif [[ "$DISTRIB_ID" == 'Ubuntu' ]] \
	|| [[ "$DISTRIB_ID" == 'Debian' ]]; then
	WEB_GROUP="www-data"
else
	echo "WARNING: Changing group perms to: '$(id -u -n)'"
	WEB_GROUP="$(id -u -n)"
fi

ISLANDORA_MODULE_DIR=../drupal/sites/all/modules/islandora

declare -a git_repos
readarray git_repos < ./islandora_modules.txt

for i in "${git_repos[@]}"
do
	repo_basename=$(basename $i);
	islandora_repo_dir=$ISLANDORA_MODULE_DIR/$repo_basename
	tmp_repo_dir=/tmp/$repo_basename

	# If repo exists in /tmp, remove for fresh clone
	if [ -d $tmp_repo_dir ]
	then
		rm -rf $tmp_repo_dir
	fi

	git clone $i $tmp_repo_dir

	if [ -d $tmp_repo_dir ]
	then
	# Remove existing module dir and copy over clone
		if [ -d $islandora_repo_dir ]
		then
			rm -rf $islandora_repo_dir
		fi
		cp -fR $tmp_repo_dir $islandora_repo_dir
		rm -rf $tmp_repo_dir
		chgrp -R $WEB_GROUP $islandora_repo_dir
	fi
done

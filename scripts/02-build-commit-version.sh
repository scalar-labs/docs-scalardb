#!/bin/bash
# This bash script commits the version that you had previously built by using the `bash ./scripts/01-build-version.sh "<VERSION>"` command locally in Terminal. To commit a previous version of the docs to the `gh-pages` branch, you must run this bash script locally from Terminal and then run `bash ./scripts/03-build-commit-latest.sh`.

# Variables
installed="bundle"
# Variable for the version
version=$1

# Get the latest commit SHA in the source directory branch.
last_SHA=( $(git log -n 1 --pretty=oneline) )
# The name of the temporary folder will be the last commit SHA to prevent possible conflicts with other folder names.
clone_dir="/tmp/clone_$last_SHA/"

# Make sure Jekyll is installed locally.
if ! gem list $installed; then
        echo "You do not have the pre-reqs installed. Refer to the Minimal Mistakes theme site for instructions on how to install the Jekyll requirements."
        exit 0
fi

# Create a directory to hold the temporary clone.
mkdir $clone_dir
cd $clone_dir
# Clone a clean copy of the repository from GitHub.
git clone git@github.com:scalar-labs/docs-scalardb.git
cd docs-scalardb
# Specify the location to build the temporary output files.
build_dir="/tmp/build_$last_SHA/"
# Install the latest bundle requirements.
bundle install
bundle exec jekyll build \
--verbose --config _config.yml \
-d /tmp/build_$last_SHA/$version > /dev/null 2>&1
if [ $? = 0 ]; then
  echo "Jekyll build successful for ScalarDB docs version $version"
  # Check out the origin `gh-pages` branch.
  echo "Checking out the `gh-pages` branch"
  git checkout gh-pages
  # Copy all the built files from where it was built to.
  echo "Copying the build directory"
  cp -r $build_dir .
  echo "Adding files to the commit"
  # Because this is a clean clone check out, add all files.
  git add .
  # Add a publishing date stamp.
  publishdate=`date +%m-%d-%Y`
  echo $publishdate
  echo $short_SHA
  # Commit the changed files.
  echo "Committing files"
  git commit -a -m "Publishing the `main` branch and ScalarDB docs version $version to GitHub Pages on $publishdate"
  echo "Files committed. Pushing to GitHub Pages."
  # Push the changes to the `gh-pages` branch.
  git push origin gh-pages
  echo "Push complete. Check https://docs.scalar-labs.com/scalardb/$version/ for updates."
  echo "Moving the built files to the local /tmp/archive/ folder so that you can troubleshoot if needed"
  mkdir -p /tmp/archive/
  mv $clone_dir /tmp/archive/$short_SHA
  #rm -rf /tmp/$build_dir/
  echo "Switch to the /tmp/archive/ directory and look for the directory "
  echo "named with the latest commit SHA, shortened to 8 characters,"
  echo "found by running git log -n 1 --pretty=oneline."
else
  echo "Jekyll build failed. Check " /tmp/archive/$short_SHA
  exit 1
fi
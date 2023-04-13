#!/bin/bash
# When running this bash script locally in Terminal, you must specify the version number as a parameter. After running this script, you must run `bash ./scripts/02-build-commit-version.sh "<VERSION>"` to commit the previous version of the docs to the `gh-pages` branch, and then run `bash ./scripts/03-build-commit-latest.sh` to commit the latest version of the docs to the `gh-pages` branch.

# Variables
installed="bundle"
# `$1` is the parameter (version number) that must be set when running this command from Terminal.
version=$1

# Get the latest commit SHA in the source directory branch.
last_SHA=( $(git log -n 1 --pretty=oneline) )
# The name of the temporary folder will be the
#   last commit SHA, to prevent possible conflicts
#   with other folder names.
clone_dir="/tmp/clone_$last_SHA/"
echo $last_SHA

# Make sure Jekyll is installed locally
if ! gem list $installed; then
        echo "You do not have the prerequirements installed. Refer to the Minimal Mistakes theme site for instructions on how to install the Jekyll requirements."
        exit 0
fi

# Create a directory to hold the temporary clone.
mkdir $clone_dir
cd $clone_dir
# Clone a clean copy of the repository from GitHub.
git clone git@github.com:scalar-labs/docs-scalardb.git
cd docs-scalardb
# Specify the location to build the temporary output files.
build_dir="/tmp/build_$last_SHA"
echo $build_dir
# Check out the branch containing versioned docs.
git checkout docs-scalardb/$version
bundle install
bundle exec jekyll build \
--config _config.yml,_config.$version.yml \
-d $build_dir/docs-scalardb/$version/ > /dev/null 2>&1
if [ $? = 0 ]; then
  echo "Jekyll build failed for ScalarDB docs version" $version
else
   echo "Jekyll build successful for ScalarDB docs version" $version
   exit 1
fi
  # Check out the origin `gh-pages` branch.
echo "Checking out the `gh-pages` branch"
git checkout gh-pages
# Copy all the built files from where it was built to.
echo "Copying the build directory"
cp -r $build_dir .
echo "Adding files to the commit"
# Because you don't want to add root files, add only the version folder.
git add $version/
# Add a publishing date stamp.
publishdate=`date +%m-%d-%Y`
echo $publishdate
echo $last_SHA
# Commit the changed files.
echo "Committing files"
git commit -a -m "Publishing the `main` branch to GitHub Pages on $publishdate with $last_SHA."
echo "Files committed. Pushing to GitHub Pages."
git push origin gh-pages
echo "Push complete. Check https://docs.scalar-labs.com/scalardb/$version/ for updates."
echo "Moving the built files to the local /tmp/archive/ folder so that you can troubleshoot if needed."
mkdir -p /tmp/archive/
mv $clone_dir /tmp/archive/$last_SHA
rm -rf /tmp/$build_dir/
echo "Switch to the /tmp/archive/ directory and look for the directory "
echo "named with the latest commit SHA, "
echo "found by running git log -n 1 --pretty=oneline."


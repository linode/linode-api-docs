#!/bin/bash

if [ -z ${1+x} ]
  then echo "Version is required"; exit 1;

  else echo "Deploying version ${1}"
fi

echo "Checking out development branch"
git checkout development
echo "Creating a release branch release-${1}"
git checkout -b release-{1}
echo "Updating openapi.yaml with the new version number"
sed -ie -E -- "s|version: [0-9]+\.[0-9]+\.[0-9]|version: ${1}|" openapi.yaml
echo "Committing the version bump"
git add --all
git commit -m "Bump version to ${1}"
echo "Tagging the version commit with the version number"
git tag ${1}

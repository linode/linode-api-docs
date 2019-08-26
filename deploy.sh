#!/bin/bash

if [ -z ${1+x} ]
  then echo "Version is required"; exit 1;

  else echo "Deploying version ${1}"
fi
git checkout development
git checkout -b release-{1}
sed -i -- "s|version: DEVELOPMENT|version: ${1}|" openapi.yaml
git add --all
git commit -m "Bump version to ${1}"
git tag ${1}

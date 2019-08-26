#!/bin/bash

echo "Deploying version ${1}"

sed -i -- "s|version: DEVELOPMENT|version: ${1}|" openapi.yaml
git add --all
git commit -m "Bump version to ${1}"
git tag ${1}

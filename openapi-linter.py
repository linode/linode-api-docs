#!/usr/local/bin/python3
#
# OpenAPI Spec Linter
#
# Usage:
#  ./openapi-linter.py openapi.yaml
#
# Scans the provided openapi 3 spec file and outputs and errors found.  The
# provided file is expected to be a yaml representation of the openapi spec,
# and formatting/errors are provided by the openapi_v3_spec_validator package

import os
import sys
import yaml

from jsonschema.exceptions import RefResolutionError
from openapi_spec_validator import openapi_v3_spec_validator


target = sys.argv[1]
pretty = len(sys.argv) > 2 and sys.argv[2] == 'pretty'

error_symbol = '❌  ' if pretty else '!!!'
ok_symbol = '✅ ' if pretty else ''

if not os.path.isfile(target):
    print("File not found: {}".format(target))
    sys.exit(2)

with open(target) as f:
    spec = yaml.safe_load(f.read())

has_errors=False
errors = openapi_v3_spec_validator.iter_errors(spec)

try:
    for e in errors:
        has_errors=True
        print("{} {path}: {message}".format(error_symbol, path='.'.join(e.path), message=e.message))
except RefResolutionError as e:
    print("{} {}".format(error_symbol, e))
    has_errors=True


if has_errors:
    sys.exit(1)

print("{} OK".format(ok_symbol))

# Linode OpenAPI 3

[![Build Status](https://travis-ci.com/linode/linode-api-docs.svg?branch=master)](https://travis-ci.com/linode/linode-api-docs)

This is the Linode API OpenAPI 3 Schema

## Requirements

The linter used for the OpenAPI spec is written in python3.
A virtualenv is recommended for local work.

```
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
```

## Development

The spec can be linted using the `openapi3` module.

```
python -m openapi3 openapi.yaml
```

### Versioning

When making a new release you **must** tag the release with the correct semantic versioning-compliant version string so that all versions are populated appropriately.
There is a `./bin/deploy` helper which will help with this process.

```
./bin/deploy 0.1.0
```

## Spec Extensions

The OpenAPI specification supports vendor-specific extensions prefixed with an
`x-` in the attribute name.  The following extensions are created by Linode for
use in our spec:

Attribute | Location | Type | Supported By | Explanation
---|---|---|---|---
`x-linode-filterable` | schema properties | boolean | | If `true`, indicates that this property may be included in an X-Filter header
`x-linode-grant` | method | string | | The level of access a user must have in order to call this endpoint.
`x-linode-cli-display` | schema properties | integer | linode-cli | If truthy, this property will be displayed in the Linode CLI.  The numeric value determines the ordering of the displayed columns, left to right.
`x-linode-cli-color` | schema properties | object | linode-cli | A mapping of possible property values to color codes understood by python's [colorclass module](https://pypi.python.org/pypi/colorclass).  Must include a `default_`, used for any value that doesn't match one of the keys.
`x-linode-cli-format` | schema properties | string | linode-cli |  Overrides the value of the "format" field for this property, but for the CLI only.  Valid values are `file` and `json`.
`x-linode-cli-command` | path | string | linode-cli | The command group the methods of this path fall into when generating commands in the `linode-cli <command> <action>` format.
`x-linode-cli-action` | method | string | linode-cli | The action this method will be mapped to when generating commands in the `linode-cli <command> <action>` format.
`x-linode-cli-skip` | method | boolean | linode-cli | If true, the CLI will not expose this action.
`x-linode-redoc-load-ids`| operation | boolean | If true, ReDoc will load this path and print a bulleted list of IDs.  This only works on public collections.
`x-linode-ref-name`| keyword | string | [Linode Developer's Site](https://github.com/linode/developers) | Provides a mechanism by which the Developer's site can generate a dropdown menu with an Object's name when using the `oneOf` keyword with a `discriminator`. **Note**: This front end functionality is currently being developed.
`x-linode-cli-rows`| media type | array | linode-cli | A list of JSON paths where the CLI can find the value it should treat as table rows.  Only needed for irregular endpoints.
`x-linode-cli-use-schema` | media type | schema or $ref | linode-cli | The schema the CLI should use when showing a row for this response.  Use with `x-linode-cli-rows`.
`x-linode-cli-nested-list` | media type | string | linode-cli | The name of the property defined by this response body's schema that is a nested list.  Items in the list will be broken out into rows in the CLI's output.

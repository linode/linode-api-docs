# Linode OpenAPI 3

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

The spec can be linted using the `./bin/lint` helper.

```
python3 ./bin/lint openapi.yaml
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
`x-linode-cli-command` | path | string | linode-cli | The command group the methods of this path fall into when generating commands in the `linode-cli <command> <action>` format.
`x-linode-cli-action` | method | string | linode-cli | The action this method will be mapped to when generating commands in the `linode-cli <command> <action>` format.
`x-linode-cli-skip` | method | boolean | linode-cli | If true, the CLI will not expose this action.
`x-linode-redoc-load-ids`| operation | boolean | If true, ReDoc will load this path and print a bulleted list of IDs.  This only works on public collections.

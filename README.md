# Linode OpenAPI 3

This is the Linode API OpenAPI 3 Schema

## Implementation

We are using [ReDoc](https://github.com/Rebilly/ReDoc) as the front end
UI for our OpenAPI specification.

Additionally, we are taking advantage of ReDoc's support of
[Vendor Extensions](https://github.com/Rebilly/ReDoc/blob/master/docs/redoc-vendor-extensions.md)
such as `x-logo` and `x-code-samples` for extended functionality.

A CSS file has also been added to the html page, to allow customization to the
output.

## Requirements

Per the [Deployment
Guidelines](https://github.com/Rebilly/ReDoc#deployment) of the ReDoc
specification, ReDoc must be installed on the server via yarn or npm.

**yarn:**
```
yarn add redoc
```

**NPM:**
```
npm install redoc --save
```

## Development

Any http server serving this directory will work - simply reload the page to
see changes.  We're working on a nicer way to do this, but for now this should
get you started:

```shell
python -m SimpleHTTPServer
```

### Updating Dependencies

The ReDoc version we are using in this repo is from a fork of the mainline ReDoc
repo, found [here](https://github.com/dnknapp/ReDoc).  This fork has custom
modifications for Linode.  In order to update the ReDoc we are using, clone that
repo, rebase it's HEAD onto the latest upstream ReDoc (if desired), and run the
following commands to generate a `redoc.standalone.js`:

```bash
yarn
yarn bundle
cp bundles/redoc.standalone.js /path/to/linode-api-docs/
```

This file _is_ committed to this repository, _is_ packaged with this repo's deb,
and _is_ referenced with a relative link on the server.

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

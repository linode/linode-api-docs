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

## Deploy

_TODO:_

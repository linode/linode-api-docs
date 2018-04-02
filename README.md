<h1 align="center">
  <img src="https://www.linode.com/media/images/logos/diagonal/light/linode-logo_diagonal_light_medium.png" width="200" />
  <br />
  The Linode API Docs
</h1>

This is the new Linode developers site. It provides documentation to complement the APIv4.
This documentation can be viewed at [developers.linode.com](https://developers.linode.com).

## Setup

    brew install yarn
    git clone https://github.com/linode/linode-api-docs.git
    cd linode-api-docs
    node --version # should be 8.4.0
    yarn

## Development

Run:

    yarn start

to run the prebuild script and start the development server. Connect to
[localhost:5000](https://localhost:5000) to try it out. Most of the changes you
make will be applied on the fly, but you may occasionally find that you have to
restart it.

### Making Commits

We use [gitchangelog](https://github.com/vaab/gitchangelog) to generate our
changelogs for this repository.  Please begin commit messages with one of these
prefixes to have them included in the changelog:

| Tag | Meaning |
| new | Features |
| bug | Bug Fixes |
| ref | Refactors |
| brk | Breaking Changes |

If you have more information to include in the changelog, include them as bullet
points below, starting the line with an asterisk.

Example:

```bash
new: Added docs for /some/thing

This text is ignored

* More information in the changelog
```

This will produce the following output:

```
Features:

 * Added docs for /some/thing
   * More information in the changelog
```

## Scripts

The `prebuild.js` script converts yaml into a js file imported by the app. 
Prebuild builds a json tree of endpoint indices, endpoints, and methods with 
the associated resource objects.

## License

The Linode Manager's code is distributed under the terms of the [BSD 3-clause
license](https://github.com/linode/manager/blob/master/LICENSE). The assets are
not licensed for any purpose without prior written approval from Linode, unless
otherwise noted.

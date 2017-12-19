import React from 'react';
import { Link } from 'react-router';

import { ExternalLink } from 'linode-components';
import { Table } from 'linode-components';
import { Code } from 'linode-components';

import { API_ROOT, API_VERSION } from '~/constants';


export default function Introduction() {
  return (
    <section className="Article">
      <h1>Introduction</h1>
      <section>
        <br />
        <div className="alert alert-danger" role="alert">
          This API is in <b>Early Access</b>, and as such we will regularly be making releases,
          some of which will contain <b>breaking changes. </b>
          <Link to={`/${API_VERSION}/changelogs`}>
            Please review the changelogs
          </Link> and <ExternalLink to="https://welcome.linode.com/api">
          subscribe to the mailing list</ExternalLink> for updates on changes and releases.
        </div>
        <p>
          The Linode APIv4 is an HTTP service that follows (to a large extent)&nbsp;
          <ExternalLink to="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</ExternalLink>
          &nbsp;style. Resources (like Linodes) have predictable URLs that use standard
          HTTP methods to manipulate and return standard HTTP status codes to tell you how
          it went.
        </p>
        <div className="alert alert-info" role="alert">
          <Link to={`/${API_VERSION}/guides/curl/testing-with-curl`}>
            Check out the Testing with cURL guide
          </Link> to get started making API calls using a Personal Access Token (PAT).
        </div>
        <p>
          All APIv4 endpoints are located at:
        </p>
        <section>
          <Code example={`${API_ROOT}/${API_VERSION}/*`} name="bash" noclipboard />
        </section>
        <p>
          Occasionally we will add features and improvements to our API -
          only certain changes will trigger a version bump, including:
        </p>
        <ul>
          <li>Endpoint path changes</li>
          <li>JSON properties removed or changed</li>
          <li>Core changes (authentication, RESTful principles, etc)</li>
        </ul>
        <p>
          Notably, the addition of new API endpoints and new properties on JSON blobs does
          not imply a new version number.
        </p>
      </section>
      <section>
        <h2>
          HTTP Methods
          <span className="anchor" id="http-methods">&nbsp;</span>
        </h2>
        <Table
          className="Table--secondary"
          columns={[
            { dataKey: 'method', label: 'Method', headerClassName: 'MethodColumn' },
            {
              dataKey: 'description',
              label: 'Description',
              headerClassName: 'DescriptionColumn',
            },
          ]}
          data={[
            { method: 'GET', description: 'Gets information about a resource or resources' },
            { method: 'PUT', description: 'Edits information about a resource' },
            { method: 'POST', description: 'Creates a new resource' },
            { method: 'DELETE', description: 'Deletes a resource' },
          ]}
        />
        <p>
          The API exposes <strong>resources</strong> through various HTTP endpoints.
          You work with these resources through consistent use of HTTP verbs and
          a consistent tree of endpoints.
        </p>
      </section>
      <div className="text-sm-center">
        <Link to={`/${API_VERSION}/access`}>
          Create an OAuth client and get an OAuth token &raquo;
        </Link>
      </div>
    </section>
  );
}

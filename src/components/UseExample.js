import PropTypes from 'prop-types';
import React from 'react';

import { Tabs } from 'linode-components';
import { Code } from 'linode-components';


export default function UseExample({ examples }) {
  if (!examples) {
    return null;
  }

  const tabs = examples.map(function ({ name, value }) {
    return {
      name,
      children: <Code key={`${name}-index`} example={value} name={name} />,
    };
  });

  return (
    <div className="UseExample">
      <Tabs tabs={tabs} />
    </div>
  );
}

UseExample.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.object),
};

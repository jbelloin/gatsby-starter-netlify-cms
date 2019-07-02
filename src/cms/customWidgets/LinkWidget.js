import React from 'react';

const LinkWidget = ({ value, onChange }) => (
  <input type="text" onChange={onChange} value={value} />
);

export default LinkWidget;

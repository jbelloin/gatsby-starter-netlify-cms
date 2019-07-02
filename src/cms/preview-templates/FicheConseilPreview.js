import React from 'react';
import PropTypes from 'prop-types';
import { FicheConseilTemplate } from '../../templates/fiche-conseil';

const FicheConseilPreview = ({ entry, widgetFor }) => (
  <FicheConseilTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
);

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default FicheConseilPreview;

import React from 'react';
import PropTypes from 'prop-types';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const DrawOnMap = ({ options, rldCreated, rldEdited }) => (<FeatureGroup>
  <EditControl
    position="topright"
    draw={options.draw}
    edit={options.edit}
    onCreated={rldCreated}
    onEdited={rldEdited}
  />
</FeatureGroup>);

DrawOnMap.propTypes = {
  options: PropTypes.object.isRequired,
  rldCreated: PropTypes.func.isRequired,
  rldEdited: PropTypes.func.isRequired,
};

export default DrawOnMap;

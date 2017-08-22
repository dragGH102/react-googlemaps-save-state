import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLayer } from 'react-leaflet-google';

const Gmaps = ({ options }) => (<GoogleLayer
  googlekey={options.key}
  maptype={options.mapType}
  styles={options.styles}
/>);

Gmaps.propTypes = {
  options: PropTypes.object.isRequired,
};

export default Gmaps;

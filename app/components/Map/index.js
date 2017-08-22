/*
 *
 * Map
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, Map as LMap } from 'react-leaflet';
import DrawOnMap from './components/DrawOnMap';
import Gmaps from './components/Gmaps';

export class Map extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
  }

  /* eslint-disable no-underscore-dangle */
  rldCreated = (e) => {
    this.props.onCreate(e.layer._leaflet_id.toString(), e.layer.toGeoJSON());
  };

  rldEdited = (e) => {
    const updatedLayers = [];

    Object.keys(e.layers._layers).forEach((layer) => {
      updatedLayers[layer] = e.layers._layers[layer].toGeoJSON();
    });

    this.props.onEdit(updatedLayers);
  };
  /* eslint-enable no-underscore-dangle */

  render() {
    const { center, zoom, gMapsConfig, height, geoJsonData } = this.props;

    return (<div>
      {<LMap
        zoom={zoom}
        maxZoom={zoom}
        center={center}
        zoomControl
        style={{
          height,
          margin: '15px',
          zIndex: 1,
        }}
      >
        {/* Gmaps */}
        <Gmaps options={gMapsConfig} />

        {/* DRAW */}
        {!geoJsonData && <DrawOnMap
          options={{
            // hide unwanted draw options and all delete options
            draw: {
              polygon: false,
              marker: false,
              square: false,
              polyline: false,
              circle: false,
            },
            edit: {
              remove: false,
            },
          }}
          rldCreated={this.rldCreated}
          rldEdited={this.rldEdited}
        />}

        {geoJsonData && <GeoJSON data={geoJsonData} />}
      </LMap>}
    </div>);
  }
}

Map.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  gMapsConfig: PropTypes.object,
  height: PropTypes.string.isRequired,
  geoJsonData: PropTypes.object,
};

Map.defaultProps = {
  // Brussels
  center: {
    lat: 50.8503,
    lng: 4.3517,
  },
  zoom: 13,
  height: '200px',
  gMapsConfig: {
    key: 'VALID_GMAPS_API_KEY_HERE',
    mapType: 'road',
  },
};

export default Map;

/*
 *
 * FeatureContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Area from 'components/Area';
import styled from 'styled-components';
import Map from 'components/Map';
import _ from 'lodash';
import { cloneObjectArray, getGeoJsonFeatureCollection } from './lib';

const ButtonStyled = styled.button`
  cursor: pointer;
  border: 1px solid #000;
`;

class FeatureContainer extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      areas: [],
      incrementalId: 0,
      initialState: null,
      locationRequested: false,
      center: null,
    };
  }

  componentWillMount() {
    // restore eventual state in localStorage
    const areas = localStorage.getItem('areas');
    const areasJson = JSON.parse(areas);

    if (areasJson) {
      this.setState({
        areas: areasJson.features,
        initialState: areasJson, // map layers
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          locationRequested: true,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  }

  // from outside the map
  onDelete = (id) => {
    if (!id) return;

    // clone original array of objects
    const areasClone = cloneObjectArray(this.state.areas);

    // remove geojson layer
    const areaToRemove = areasClone.find((area) => area && area.id === id);
    const indexToRemove = areasClone.indexOf(areaToRemove);

    // ... from state
    areasClone.splice(indexToRemove, 1);

    this.setState({
      areas: areasClone,
    });

    // ... from map
    const incId = areaToRemove.incrementalId;
    const target = document.querySelectorAll('path')[incId];
    document.querySelectorAll('path')[0].parentNode.removeChild(target);

    // reduce incremental id of following items
    areasClone.map((area, index) => {
      const areaToReturn = area;
      if (index > indexToRemove) {
        areaToReturn.incrementalId -= 1;
      }
      return areaToReturn;
    });

    // store updated areas in localStorage (as FeatureCollection)
    if (areasClone.filter((area) => !!area).length > 0) {
      localStorage.setItem('areas', JSON.stringify(getGeoJsonFeatureCollection(areasClone)));
    } else {
      localStorage.removeItem('areas');
    }
  };

  onEditFromMap = (layers) => {
    const layersWithAttributes = layers.map((layer, index) => {
      const l = layer;
      l.id = parseInt(index, 10);
      l.name = this.state.areas.find((area) => area && area.id === index).name;
      return l;
    });

    // only edited areas are returned -> add existing areas
    const layerWithNonEditedOnes = _.uniqBy(
      this.state.areas.concat(layersWithAttributes).filter((area) => !!area),
      'id'
    );

    this.setState({
      areas: layerWithNonEditedOnes,
    });

    // store updated areas in localStorage (as FeatureCollection)
    localStorage.setItem('areas', JSON.stringify(getGeoJsonFeatureCollection(layerWithNonEditedOnes)));
  };

  onCreateFromMap = (id, geoJsonLayer) => {
    const areasClone = cloneObjectArray(this.state.areas);
    const incrementalId = this.state.incrementalId;

    // add new layer
    areasClone[id] = geoJsonLayer;
    areasClone[id].id = parseInt(id, 10);
    areasClone[id].incrementalId = incrementalId;
    areasClone[id].name = 'Area'; // default name

    this.setState({
      areas: areasClone,
      incrementalId: incrementalId + 1,
    });

    // store updated areas in localStorage (as FeatureCollection)
    localStorage.setItem('areas', JSON.stringify(getGeoJsonFeatureCollection(areasClone)));
  };

  onAreaEdit = (id, content) => {
    const areasClone = cloneObjectArray(this.state.areas);
    areasClone.find((area) => area && area.id === id).name = content;

    this.setState({
      areas: areasClone,
    });

    // store updated areas in localStorage (as FeatureCollection)
    localStorage.setItem('areas', JSON.stringify(getGeoJsonFeatureCollection(areasClone)));
  };

  resetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    const { areas, className, locationRequested, center } = this.state;

    return (<div className={className}>
      {locationRequested && <Map
        ref={(map) => { this.map = map; }}
        onCreate={this.onCreateFromMap}
        loadedData={this.state.areas}
        geoJsonData={this.state.initialState}
        onEdit={this.onEditFromMap}
        center={center}
      />}
      {!locationRequested && <div>accept/decline location request to show the map</div>}
      {areas.map((area) => (<Area
        hasData={!!this.state.initialState}
        area={area}
        key={area.id}
        onEdit={this.onAreaEdit}
        onDelete={this.onDelete}
      />))}
      {areas.length > 0 && <ButtonStyled onClick={this.resetData}>Reset</ButtonStyled>}
    </div>);
  }
}

FeatureContainer.propTypes = {
  className: PropTypes.string,
};

export default styled(FeatureContainer)`
  width: 70%;
  margin: auto;
`;

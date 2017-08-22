import { cloneObject, cloneObjectArray, getGeoJsonFeatureCollection } from '../lib';

const objectMock = {};

describe('lib', () => {
  describe('getGeoJsonFeatureCollection', () => {
    it('should return a GeoJSON FeatureCollection from an array of features', () => {
      const features = [objectMock, objectMock];

      expect(getGeoJsonFeatureCollection(features)).toEqual({
        type: 'FeatureCollection',
        features,
      });
    });
  });

  describe('cloneObject', () => {
    it('should return a clone of the original object', () => {
      expect(cloneObject(objectMock)).toEqual({});
    });
  });

  describe('cloneObjectArray', () => {
    it('should return a clone of the original array of objects', () => {
      const objectArray = [objectMock, objectMock];
      expect(cloneObjectArray(objectArray)).toEqual([objectMock, objectMock]);
    });
  });
});

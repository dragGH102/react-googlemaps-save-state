export const getGeoJsonFeatureCollection = (features) => ({
  type: 'FeatureCollection',
  features: features.filter((feature) => !!feature),
});

export const cloneObjectArray = (array) => array.map((object) => cloneObject(object));

export const cloneObject = (object) => {
  const objectClone = {};
  /* eslint-disable */
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      objectClone[key] = object[key];
    }
  }
  /* eslint-enable */
  return objectClone;
};

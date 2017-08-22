import { createSelector } from 'reselect';

/**
 * Direct selector to the featureContainer state domain
 */
const selectFeatureContainerDomain = () => (state) => state.get('featureContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FeatureContainer
 */

const makeSelectFeatureContainer = () => createSelector(
  selectFeatureContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFeatureContainer;
export {
  selectFeatureContainerDomain,
};

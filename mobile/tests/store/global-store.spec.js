import { expect, describe, it, beforeEach } from 'vitest';
import { store } from '../../src/store/store.js';

describe('Global Store test suite', () => {
  beforeEach(async () => {
    store.state.global.currentTabClick = [];
    store.state.global.currentEventClick = [];
    store.state.global.currentTraceClick = [];
  });

  it('Update wait state throught action', () => {
    expect(store.state.global.wait).toBe(false);
    store.dispatch('global/updateWait', true);
    expect(store.state.global.wait).toBe(true);
  });

  it('Update current over state throught action', () => {
    expect(store.getters['global/getcurrentTableOver']).toBe(0);
    expect(store.state.global.currentTableOver).toBe(0);
    store.dispatch('global/updateOver', 4);
    expect(store.getters['global/getcurrentTableOver']).toBe(4);
    expect(store.state.global.currentTableOver).toBe(4);
  });

  it('Update last POI click state throught action', () => {
    expect(store.getters['global/getcurrentLastPoiClick']).toBe(0);
    expect(store.state.global.lastPoiClicked).toBe(0);
    store.dispatch('global/updateLastPoiClick', 7);
    expect(store.getters['global/getcurrentLastPoiClick']).toBe(7);
    expect(store.state.global.lastPoiClicked).toBe(7);
  });

  it('Update current poi tab click state throught action', () => {
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(0)
      .toEqual([]);
    expect(store.state.global.currentTabClick).toHaveLength(0).toEqual([]);
    store.dispatch('global/addOrRemoveClickElement', 5);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(1)
      .toEqual([5]);
    expect(store.state.global.currentTabClick).toHaveLength(1).toEqual([5]);
    store.dispatch('global/addOrRemoveClickElement', 8);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(2)
      .toEqual([5, 8]);
    expect(store.state.global.currentTabClick).toHaveLength(2).toEqual([5, 8]);
    store.dispatch('global/addOrRemoveClickElement', 5);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(1)
      .toEqual([8]);
    expect(store.state.global.currentTabClick).toHaveLength(1).toEqual([8]);
    store.dispatch('global/addOrRemoveClickElement', 5);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(2)
      .toEqual([8, 5]);
    expect(store.state.global.currentTabClick).toHaveLength(2).toEqual([8, 5]);
  });

  it('Update current poi tab click state throught from pois', () => {
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(0)
      .toEqual([]);
    expect(store.state.global.currentTabClick).toHaveLength(0).toEqual([]);
    store.dispatch('global/addOrRemovePoisClick', [{ element: { id: 5 } }]);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(1)
      .toEqual([5]);
    expect(store.state.global.currentTabClick).toHaveLength(1).toEqual([5]);
    store.dispatch('global/addOrRemovePoisClick', [
      { element: { id: 8 } },
      { element: { id: 12 } },
    ]);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(3)
      .toEqual([5, 8, 12]);
    expect(store.state.global.currentTabClick)
      .toHaveLength(3)
      .toEqual([5, 8, 12]);
    store.dispatch('global/addOrRemovePoisClick', [
      { element: { id: 5 } },
      { element: { id: 12 } },
    ]);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(1)
      .toEqual([8]);
    expect(store.state.global.currentTabClick).toHaveLength(1).toEqual([8]);
    store.dispatch('global/addOrRemovePoisClick', [{ element: { id: 5 } }]);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(2)
      .toEqual([8, 5]);
    expect(store.state.global.currentTabClick).toHaveLength(2).toEqual([8, 5]);
  });

  it('Update current poi tab click state throught remove action', () => {
    store.state.global.currentTabClick = [5, 12, 15];
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(3)
      .toEqual([5, 12, 15]);
    expect(store.state.global.currentTabClick)
      .toHaveLength(3)
      .toEqual([5, 12, 15]);
    store.dispatch('global/removeClickElement', 5);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(2)
      .toEqual([12, 15]);
    expect(store.state.global.currentTabClick)
      .toHaveLength(2)
      .toEqual([12, 15]);
    store.dispatch('global/removeClickElement', 8);
    expect(store.getters['global/getCurrentTabClick'])
      .toHaveLength(2)
      .toEqual([12, 15]);
    expect(store.state.global.currentTabClick)
      .toHaveLength(2)
      .toEqual([12, 15]);
  });

  it('Update current event over state throught action', () => {
    expect(store.getters['global/getcurrentEventTableOver']).toBe(0);
    expect(store.state.global.currentEventOver).toBe(0);
    store.dispatch('global/updateEventOver', 4);
    expect(store.getters['global/getcurrentEventTableOver']).toBe(4);
    expect(store.state.global.currentEventOver).toBe(4);
  });

  it('Update last event click state throught action', () => {
    expect(store.getters['global/getcurrentLastEventClick']).toBe(0);
    expect(store.state.global.lastEventClicked).toBe(0);
    store.dispatch('global/updateLastEventClick', 7);
    expect(store.getters['global/getcurrentLastEventClick']).toBe(7);
    expect(store.state.global.lastEventClicked).toBe(7);
  });

  it('Update current event tab click state throught action', () => {
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(0)
      .toEqual([]);
    expect(store.state.global.currentEventClick).toHaveLength(0).toEqual([]);
    store.dispatch('global/addOrRemoveEventClickElement', 5);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(1)
      .toEqual([5]);
    expect(store.state.global.currentEventClick).toHaveLength(1).toEqual([5]);
    store.dispatch('global/addOrRemoveEventClickElement', 8);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(2)
      .toEqual([5, 8]);
    expect(store.state.global.currentEventClick)
      .toHaveLength(2)
      .toEqual([5, 8]);
    store.dispatch('global/addOrRemoveEventClickElement', 5);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(1)
      .toEqual([8]);
    expect(store.state.global.currentEventClick).toHaveLength(1).toEqual([8]);
    store.dispatch('global/addOrRemoveEventClickElement', 5);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(2)
      .toEqual([8, 5]);
    expect(store.state.global.currentEventClick)
      .toHaveLength(2)
      .toEqual([8, 5]);
  });

  it('Update current event tab click state throught from pois', () => {
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(0)
      .toEqual([]);
    expect(store.state.global.currentEventClick).toHaveLength(0).toEqual([]);
    store.dispatch('global/addOrRemoveEventsClick', [{ element: { id: 5 } }]);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(1)
      .toEqual([5]);
    expect(store.state.global.currentEventClick).toHaveLength(1).toEqual([5]);
    store.dispatch('global/addOrRemoveEventsClick', [
      { element: { id: 8 } },
      { element: { id: 12 } },
    ]);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(3)
      .toEqual([5, 8, 12]);
    expect(store.state.global.currentEventClick)
      .toHaveLength(3)
      .toEqual([5, 8, 12]);
    store.dispatch('global/addOrRemoveEventsClick', [
      { element: { id: 5 } },
      { element: { id: 12 } },
    ]);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(1)
      .toEqual([8]);
    expect(store.state.global.currentEventClick).toHaveLength(1).toEqual([8]);
    store.dispatch('global/addOrRemoveEventsClick', [{ element: { id: 5 } }]);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(2)
      .toEqual([8, 5]);
    expect(store.state.global.currentEventClick)
      .toHaveLength(2)
      .toEqual([8, 5]);
  });

  it('Update current event tab click state throught remove action', () => {
    store.state.global.currentEventClick = [5, 12, 15];
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(3)
      .toEqual([5, 12, 15]);
    expect(store.state.global.currentEventClick)
      .toHaveLength(3)
      .toEqual([5, 12, 15]);
    store.dispatch('global/removeEventClickElement', 5);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(2)
      .toEqual([12, 15]);
    expect(store.state.global.currentEventClick)
      .toHaveLength(2)
      .toEqual([12, 15]);
    store.dispatch('global/removeEventClickElement', 8);
    expect(store.getters['global/getCurrentEventTabClick'])
      .toHaveLength(2)
      .toEqual([12, 15]);
    expect(store.state.global.currentEventClick)
      .toHaveLength(2)
      .toEqual([12, 15]);
  });

  it('Update current trace over state throught action', () => {
    expect(store.getters['global/getcurrentTraceTableOver']).toBe(0);
    expect(store.state.global.currentTraceOver).toBe(0);
    store.dispatch('global/updateTraceOver', 4);
    expect(store.getters['global/getcurrentTraceTableOver']).toBe(4);
    expect(store.state.global.currentTraceOver).toBe(4);
  });

  it('Update last trace click state throught action', () => {
    expect(store.getters['global/getcurrentLastTraceClick']).toBe(0);
    expect(store.state.global.lastTraceClicked).toBe(0);
    store.dispatch('global/updateLastTraceClick', 7);
    expect(store.getters['global/getcurrentLastTraceClick']).toBe(7);
    expect(store.state.global.lastTraceClicked).toBe(7);
  });

  it('Update current trace tab click state throught action', () => {
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(0)
      .toEqual([]);
    expect(store.state.global.currentTraceClick).toHaveLength(0).toEqual([]);
    store.dispatch('global/addOrRemoveTraceClickElement', 5);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(1)
      .toEqual([5]);
    expect(store.state.global.currentTraceClick).toHaveLength(1).toEqual([5]);
    store.dispatch('global/addOrRemoveTraceClickElement', 8);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(2)
      .toEqual([5, 8]);
    expect(store.state.global.currentTraceClick)
      .toHaveLength(2)
      .toEqual([5, 8]);
    store.dispatch('global/addOrRemoveTraceClickElement', 5);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(1)
      .toEqual([8]);
    expect(store.state.global.currentTraceClick).toHaveLength(1).toEqual([8]);
    store.dispatch('global/addOrRemoveTraceClickElement', 5);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(2)
      .toEqual([8, 5]);
    expect(store.state.global.currentTraceClick)
      .toHaveLength(2)
      .toEqual([8, 5]);
  });

  it('Update current trace tab click state throught from pois', () => {
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(0)
      .toEqual([]);
    expect(store.state.global.currentTraceClick).toHaveLength(0).toEqual([]);
    store.dispatch('global/addOrRemoveTracesClick', [{ element: { id: 5 } }]);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(1)
      .toEqual([5]);
    expect(store.state.global.currentTraceClick).toHaveLength(1).toEqual([5]);
    store.dispatch('global/addOrRemoveTracesClick', [
      { element: { id: 8 } },
      { element: { id: 12 } },
    ]);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(3)
      .toEqual([5, 8, 12]);
    expect(store.state.global.currentTraceClick)
      .toHaveLength(3)
      .toEqual([5, 8, 12]);
    store.dispatch('global/addOrRemoveTracesClick', [
      { element: { id: 5 } },
      { element: { id: 12 } },
    ]);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(1)
      .toEqual([8]);
    expect(store.state.global.currentTraceClick).toHaveLength(1).toEqual([8]);
    store.dispatch('global/addOrRemoveTracesClick', [{ element: { id: 5 } }]);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(2)
      .toEqual([8, 5]);
    expect(store.state.global.currentTraceClick)
      .toHaveLength(2)
      .toEqual([8, 5]);
  });

  it('Update current trace tab click state throught remove action', () => {
    store.state.global.currentTraceClick = [5, 12, 15];
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(3)
      .toEqual([5, 12, 15]);
    expect(store.state.global.currentTraceClick)
      .toHaveLength(3)
      .toEqual([5, 12, 15]);
    store.dispatch('global/removeTraceClickElement', 5);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(2)
      .toEqual([12, 15]);
    expect(store.state.global.currentTraceClick)
      .toHaveLength(2)
      .toEqual([12, 15]);
    store.dispatch('global/removeTraceClickElement', 8);
    expect(store.getters['global/getCurrentTraceTabClick'])
      .toHaveLength(2)
      .toEqual([12, 15]);
    expect(store.state.global.currentTraceClick)
      .toHaveLength(2)
      .toEqual([12, 15]);
  });

  it('Update preferences throught action', () => {
    expect(store.getters['global/getPoiConfigPreferences']).toEqual(null);
    expect(store.state.global.poiConfigPreferences).toEqual(null);
    store.dispatch('global/savePoiPreferences', {label: 'test', name: 'value'});
    expect(store.getters['global/getPoiConfigPreferences']).toEqual({label: 'test', name: 'value'});
    expect(store.state.global.poiConfigPreferences).toEqual({label: 'test', name: 'value'});
  });
});

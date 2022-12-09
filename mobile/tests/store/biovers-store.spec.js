import {
  expect,
  describe,
  it,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from 'vitest';
import { store } from '../../src/store/store.js';
import {
  getPoiColumns,
  getPathColumns,
  getTracesColumns,
  getEventsColumns,
} from '../../src/utils/columns.js';
import { useStore } from '../../src/composables/store.js';

describe('Global Store test suite', () => {
  beforeAll(async () => {
    vi.mock('../../src/utils/api.js', () => ({
      getBiovers: vi.fn(() => {
        return {
          data: [
            {
              id: 3,
              name: 'Biovers3',
              Poi: [{ id: 4 }],
              Path: [],
              UserTrace: [],
              Event: [],
            },
            {
              id: 5,
              name: 'Biovers5',
              Poi: [{ id: 6 }],
              Path: [],
              UserTrace: [],
              Event: [],
            },
          ],
        };
      }),
      getBioversByUser: vi.fn(() => {
        return {
          data: [
            {
              id: 3,
              name: 'Biovers3',
              Poi: [{ id: 4 }],
              Path: [],
              UserTrace: [],
              Event: [],
            },
          ],
        };
      }),
    }));
  });

  beforeEach(() => {
    store.state.biovers.userPreference = [];
    store.state.biovers.publicBiovers = [];
    store.state.biovers.ownBiovers = [];
    store.state.biovers.pois = [];
    store.state.biovers.paths = [];
    store.state.biovers.traces = [];
    store.state.biovers.events = [];
    store.state.biovers.currentBioversId = -1;
    store.state.biovers.poiColumnsPreference = undefined;
    store.state.biovers.pathColumnsPreference = undefined;
    store.state.biovers.traceColumnsPreference = undefined;
    store.state.biovers.eventColumnsPreference = undefined;
    store.state.biovers.addBioversInTab = false;
    store.state.biovers.bioversToDisplay = [];
    store.state.biovers.index = 1;
    store.state.biovers.uploadInProgress = false;
    store.state.biovers.uploadDone = false;
    store.state.biovers.poisModification = {};
    store.state.biovers.pathsModification = {};
    store.state.biovers.filter = '';
    store.state.biovers.copyElement = undefined;
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('test getBiovers action without preferences', async () => {
    await store.dispatch('biovers/getBiovers');
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([
        {
          id: 3,
          name: 'Biovers3',
          Poi: [{ id: 4 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      ]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([
        {
          id: 5,
          name: 'Biovers5',
          Poi: [{ id: 6 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      ]);
  });

  it('test getBiovers action with preferences in own biovers', async () => {
    store.state.biovers.userPreference = [3];
    expect(store.state.biovers.addBioversInTab).toBe(false);
    expect(store.state.biovers.currentBioversId).toBe(-1);
    await store.dispatch('biovers/getBiovers');
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([
        {
          id: 3,
          name: 'Biovers3',
          Poi: [{ id: 4 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      ]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([
        {
          id: 5,
          name: 'Biovers5',
          Poi: [{ id: 6 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      ]);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { id: 4 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.currentBioversId).toBe(3);
    expect(store.state.biovers.addBioversInTab).toBe(true);
    expect(store.state.biovers.bioversToDisplay).toEqual([
      {
        title: 'Biovers3',
        name: '2',
        biover: {
          id: 3,
          name: 'Biovers3',
          Poi: [{ id: 4 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      },
    ]);
  });

  it('test getBiovers action with preferences in public biovers', async () => {
    store.state.biovers.userPreference = [5];
    expect(store.state.biovers.addBioversInTab).toBe(false);
    expect(store.state.biovers.currentBioversId).toBe(-1);
    await store.dispatch('biovers/getBiovers');
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([
        {
          id: 3,
          name: 'Biovers3',
          Poi: [{ id: 4 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      ]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([
        {
          id: 5,
          name: 'Biovers5',
          Poi: [{ id: 6 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      ]);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 5,
          pois: [
            {
              name: 'Biovers5',
              element: { id: 6 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.currentBioversId).toBe(5);
    expect(store.state.biovers.addBioversInTab).toBe(true);
    expect(store.state.biovers.bioversToDisplay).toEqual([
      {
        title: 'Biovers5',
        name: '2',
        biover: {
          id: 5,
          name: 'Biovers5',
          Poi: [{ id: 6 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      },
    ]);
  });

  it('test set current biovers action', async () => {
    expect(store.state.biovers.currentBioversId).toBe(-1);
    expect(store.getters['biovers/getCurrentBioverId']).toBe(-1);
    store.dispatch('biovers/setCurrentBiover', 4);
    expect(store.state.biovers.currentBioversId).toBe(4);
    expect(store.getters['biovers/getCurrentBioverId']).toBe(4);
  });

  it('test load poi columns action', async () => {
    expect(store.state.biovers.poiColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getPoiColumnsPreference']).toEqual(undefined);
    store.dispatch('biovers/savePoiColumns', getPoiColumns());
    expect(store.state.biovers.poiColumnsPreference).toEqual(getPoiColumns());
    expect(store.getters['biovers/getPoiColumnsPreference']).toEqual(
      getPoiColumns()
    );
  });

  it('test save poi columns action', async () => {
    expect(store.state.biovers.poiColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getPoiColumnsPreference']).toEqual(undefined);
    store.dispatch('biovers/loadPoiColumns');
    expect(store.state.biovers.poiColumnsPreference).toEqual(getPoiColumns());
    expect(store.getters['biovers/getPoiColumnsPreference']).toEqual(
      getPoiColumns()
    );
  });

  it('test load path columns action', async () => {
    expect(store.state.biovers.pathColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getPathColumnsPreference']).toEqual(
      undefined
    );
    store.dispatch('biovers/loadPathColumns');
    expect(store.state.biovers.pathColumnsPreference).toEqual(getPathColumns());
    expect(store.getters['biovers/getPathColumnsPreference']).toEqual(
      getPathColumns()
    );
  });

  it('test save path columns action', async () => {
    expect(store.state.biovers.pathColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getPathColumnsPreference']).toEqual(
      undefined
    );
    store.dispatch('biovers/savePathColumns', getPathColumns());
    expect(store.state.biovers.pathColumnsPreference).toEqual(getPathColumns());
    expect(store.getters['biovers/getPathColumnsPreference']).toEqual(
      getPathColumns()
    );
  });

  it('test load trace columns action', async () => {
    expect(store.state.biovers.traceColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getTraceColumnsPreference']).toEqual(
      undefined
    );
    store.dispatch('biovers/loadTraceColumns');
    expect(store.state.biovers.traceColumnsPreference).toEqual(
      getTracesColumns()
    );
    expect(store.getters['biovers/getTraceColumnsPreference']).toEqual(
      getTracesColumns()
    );
  });

  it('test save trace columns action', async () => {
    expect(store.state.biovers.traceColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getTraceColumnsPreference']).toEqual(
      undefined
    );
    store.dispatch('biovers/saveTraceColumns', getTracesColumns());
    expect(store.state.biovers.traceColumnsPreference).toEqual(
      getTracesColumns()
    );
    expect(store.getters['biovers/getTraceColumnsPreference']).toEqual(
      getTracesColumns()
    );
  });

  it('test load event columns action', async () => {
    expect(store.state.biovers.eventColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getEventColumnsPreference']).toEqual(
      undefined
    );
    store.dispatch('biovers/loadEventColumns');
    expect(store.state.biovers.eventColumnsPreference).toEqual(
      getEventsColumns()
    );
    expect(store.getters['biovers/getEventColumnsPreference']).toEqual(
      getEventsColumns()
    );
  });

  it('test save event columns action', async () => {
    expect(store.state.biovers.eventColumnsPreference).toEqual(undefined);
    expect(store.getters['biovers/getEventColumnsPreference']).toEqual(
      undefined
    );
    store.dispatch('biovers/saveEventColumns', getEventsColumns());
    expect(store.state.biovers.eventColumnsPreference).toEqual(
      getEventsColumns()
    );
    expect(store.getters['biovers/getEventColumnsPreference']).toEqual(
      getEventsColumns()
    );
  });

  it('test add new biovers action', async () => {
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    store.dispatch('biovers/addNewBiover', { id: 1 });
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 1 }]);
    store.dispatch('biovers/addNewBiover', { id: 2 });
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(2)
      .toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('test delete biovers action of own', async () => {
    store.state.biovers.userPreference = [3, 5];
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3 } },
      { biover: { id: 5 } },
    ];
    store.state.biovers.pois = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.paths = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.traces = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.events = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.ownBiovers = [{ id: 3 }, { id: 5 }];
    store.dispatch('biovers/deleteBiovers', 3);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5 }]);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.traces)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.events)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.bioversToDisplay)
      .toHaveLength(1)
      .toEqual([{ biover: { id: 5 } }]);
    expect(store.state.biovers.userPreference).toHaveLength(1).toEqual([5]);
    store.dispatch('biovers/deleteBiovers', 5);
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.traces).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.events).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.userPreference).toHaveLength(0).toEqual([]);
  });

  it('test delete biovers action of public', async () => {
    store.state.biovers.userPreference = [3, 5];
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3 } },
      { biover: { id: 5 } },
    ];
    store.state.biovers.pois = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.paths = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.traces = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.events = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.publicBiovers = [{ id: 3 }, { id: 5 }];
    store.dispatch('biovers/deleteBiovers', 3);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5 }]);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.traces)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.events)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.bioversToDisplay)
      .toHaveLength(1)
      .toEqual([{ biover: { id: 5 } }]);
    expect(store.state.biovers.userPreference).toHaveLength(1).toEqual([5]);
    store.dispatch('biovers/deleteBiovers', 5);
    expect(store.state.biovers.publicBiovers).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.traces).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.events).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.userPreference).toHaveLength(0).toEqual([]);
  });

  it('test add biovers to display action', async () => {
    store.state.biovers.ownBiovers = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    store.state.biovers.publicBiovers = [
      {
        id: 4,
        name: 'Biovers4',
        Poi: [{ id: 5 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    expect(store.state.biovers.userPreference).toEqual([]);
    expect(store.state.biovers.addBioversInTab).toBe(false);
    expect(store.state.biovers.currentBioversId).toBe(-1);
    store.dispatch('biovers/addBioverToDisplay', { id: 3 });
    expect(store.state.biovers.userPreference).toEqual([3]);
    expect(store.state.biovers.addBioversInTab).toBe(true);
    expect(store.state.biovers.currentBioversId).toBe(3);
    expect(store.state.biovers.index).toBe(2);
    expect(store.state.biovers.bioversToDisplay).toEqual([
      {
        title: 'Biovers3',
        name: '2',
        biover: {
          id: 3,
          name: 'Biovers3',
          Poi: [{ id: 4 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      },
    ]);
    store.dispatch('biovers/addBioverToDisplay', { id: 4 });
    expect(store.state.biovers.userPreference).toEqual([3, 4]);
    expect(store.state.biovers.addBioversInTab).toBe(true);
    expect(store.state.biovers.currentBioversId).toBe(4);
    expect(store.state.biovers.index).toBe(3);
    expect(store.state.biovers.bioversToDisplay).toEqual([
      {
        title: 'Biovers3',
        name: '2',
        biover: {
          id: 3,
          name: 'Biovers3',
          Poi: [{ id: 4 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      },
      {
        title: 'Biovers4',
        name: '3',
        biover: {
          id: 4,
          name: 'Biovers4',
          Poi: [{ id: 5 }],
          Path: [],
          UserTrace: [],
          Event: [],
        },
      },
    ]);
  });

  it('test remove biovers action', async () => {
    store.state.biovers.userPreference = [3, 5];
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3 } },
      { biover: { id: 5 } },
    ];
    store.state.biovers.pois = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.paths = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.traces = [{ bioverId: 3 }, { bioverId: 5 }];
    store.state.biovers.events = [{ bioverId: 3 }, { bioverId: 5 }];
    store.dispatch('biovers/removeBioverToDisplay', 3);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.traces)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.events)
      .toHaveLength(1)
      .toEqual([{ bioverId: 5 }]);
    expect(store.state.biovers.bioversToDisplay)
      .toHaveLength(1)
      .toEqual([{ biover: { id: 5 } }]);
    expect(store.state.biovers.userPreference).toHaveLength(1).toEqual([5]);
  });

  it('test add poi to display action', async () => {
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    store.state.biovers.ownBiovers = [
      { id: 3, name: 'Biovers3', Poi: [{ id: 5 }, { id: 9 }] },
      { id: 5 },
    ];
    store.state.biovers.publicBiovers = [
      { id: 4, name: 'Biovers4', Poi: [{ id: 6 }, { id: 10 }] },
      { id: 6 },
    ];
    store.dispatch('biovers/addPoiToDisplay', 3);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    store.dispatch('biovers/addPoiToDisplay', 4);
    expect(store.state.biovers.pois)
      .toHaveLength(2)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: true,
              import: false,
            },
          ],
        },
        {
          bioverId: 4,
          pois: [
            {
              name: 'Biovers4',
              element: { id: 6 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers4',
              element: { id: 10 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test update poi to display action', async () => {
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    store.state.biovers.pois.push({
      bioverId: 3,
      pois: [
        {
          name: 'Biovers3',
          element: { id: 5 },
          display: false,
          import: false,
        },
        {
          name: 'Biovers3',
          element: { id: 9 },
          display: false,
          import: false,
        },
      ],
    });
    store.dispatch('biovers/updatePoiToDisplay', {
      bioverId: 3,
      poi: { element: { id: 5 } },
    });
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test add path to display action', async () => {
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    store.state.biovers.ownBiovers = [
      { id: 3, name: 'Biovers3', Path: [{ id: 5 }, { id: 9 }] },
      { id: 5 },
    ];
    store.state.biovers.publicBiovers = [
      { id: 4, name: 'Biovers4', Path: [{ id: 6 }, { id: 10 }] },
      { id: 6 },
    ];
    store.dispatch('biovers/addPathToDisplay', 3);
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    store.dispatch('biovers/addPathToDisplay', 4);
    expect(store.state.biovers.paths)
      .toHaveLength(2)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: true,
              import: false,
            },
          ],
        },
        {
          bioverId: 4,
          paths: [
            {
              name: 'Biovers4',
              element: { id: 6 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers4',
              element: { id: 10 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test update path to display action', async () => {
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    store.state.biovers.paths.push({
      bioverId: 3,
      paths: [
        {
          name: 'Biovers3',
          element: { id: 5 },
          display: false,
          import: false,
        },
        {
          name: 'Biovers3',
          element: { id: 9 },
          display: false,
          import: false,
        },
      ],
    });
    store.dispatch('biovers/updatePathToDisplay', {
      bioverId: 3,
      path: { element: { id: 5 } },
    });
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test add trace to display action', async () => {
    expect(store.state.biovers.traces).toHaveLength(0).toEqual([]);
    store.state.biovers.ownBiovers = [
      { id: 3, name: 'Biovers3', UserTrace: [{ id: 5 }, { id: 9 }] },
      { id: 5 },
    ];
    store.state.biovers.publicBiovers = [
      { id: 4, name: 'Biovers4', UserTrace: [{ id: 6 }, { id: 10 }] },
      { id: 6 },
    ];
    store.dispatch('biovers/addTraceToDisplay', 3);
    expect(store.state.biovers.traces)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          traces: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: false,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
    store.dispatch('biovers/addTraceToDisplay', 4);
    expect(store.state.biovers.traces)
      .toHaveLength(2)
      .toEqual([
        {
          bioverId: 3,
          traces: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: false,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
        {
          bioverId: 4,
          traces: [
            {
              name: 'Biovers4',
              element: { id: 6 },
              display: false,
              import: false,
            },
            {
              name: 'Biovers4',
              element: { id: 10 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test update trace to display action', async () => {
    expect(store.state.biovers.traces).toHaveLength(0).toEqual([]);
    store.state.biovers.traces.push({
      bioverId: 3,
      traces: [
        {
          name: 'Biovers3',
          element: { id: 5 },
          display: false,
          import: false,
        },
        {
          name: 'Biovers3',
          element: { id: 9 },
          display: false,
          import: false,
        },
      ],
    });
    store.dispatch('biovers/updateTraceToDisplay', {
      bioverId: 3,
      trace: { element: { id: 5 } },
    });
    expect(store.state.biovers.traces)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          traces: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test add event to display action', async () => {
    expect(store.state.biovers.events).toHaveLength(0).toEqual([]);
    store.state.biovers.ownBiovers = [
      { id: 3, name: 'Biovers3', Event: [{ id: 5 }, { id: 9 }] },
      { id: 5 },
    ];
    store.state.biovers.publicBiovers = [
      { id: 4, name: 'Biovers4', Event: [{ id: 6 }, { id: 10 }] },
      { id: 6 },
    ];
    store.dispatch('biovers/addEventToDisplay', 3);
    expect(store.state.biovers.events)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          events: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: false,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
    store.dispatch('biovers/addEventToDisplay', 4);
    expect(store.state.biovers.events)
      .toHaveLength(2)
      .toEqual([
        {
          bioverId: 3,
          events: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: false,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
        {
          bioverId: 4,
          events: [
            {
              name: 'Biovers4',
              element: { id: 6 },
              display: false,
              import: false,
            },
            {
              name: 'Biovers4',
              element: { id: 10 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test update event to display action', async () => {
    expect(store.state.biovers.events).toHaveLength(0).toEqual([]);
    store.state.biovers.events.push({
      bioverId: 3,
      events: [
        {
          name: 'Biovers3',
          element: { id: 5 },
          display: false,
          import: false,
        },
        {
          name: 'Biovers3',
          element: { id: 9 },
          display: false,
          import: false,
        },
      ],
    });
    store.dispatch('biovers/updateEventToDisplay', {
      bioverId: 3,
      event: { element: { id: 5 } },
    });
    expect(store.state.biovers.events)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          events: [
            {
              name: 'Biovers3',
              element: { id: 5 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { id: 9 },
              display: false,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test add new poi action', async () => {
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    store.state.biovers.ownBiovers = [{ id: 3, Poi: [] }];
    store.state.biovers.publicBiovers = [{ id: 5, Poi: [] }];
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Poi: [] }, title: 'Biovers3' },
      { biover: { id: 5, Poi: [] }, title: 'Biovers5' },
    ];
    store.dispatch('biovers/addNewPoi', {
      biovers: 3,
    });
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { biovers: 3 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Poi: [{ biovers: 3 }] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Poi: [] }]);
    store.dispatch('biovers/addNewPoi', {
      biovers: 5,
    });
    expect(store.state.biovers.pois)
      .toHaveLength(2)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { biovers: 3 },
              display: true,
              import: false,
            },
          ],
        },
        {
          bioverId: 5,
          pois: [
            {
              name: 'Biovers5',
              element: { biovers: 5 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Poi: [{ biovers: 3 }] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Poi: [{ biovers: 5 }] }]);
  });

  it('test remove poi action', async () => {
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Poi: [{ id: 5 }] }, title: 'Biovers3' },
      { biover: { id: 5, Poi: [{ id: 6 }] }, title: 'Biovers5' },
    ];
    store.state.biovers.ownBiovers = [{ id: 3, Poi: [{ biovers: 3 }] }];
    store.state.biovers.publicBiovers = [{ id: 5, Poi: [{ biovers: 5 }] }];
    store.state.biovers.pois = [
      {
        bioverId: 3,
        pois: [
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 5 },
            display: true,
            import: false,
          },
        ],
      },
      {
        bioverId: 5,
        pois: [
          {
            name: 'Biovers5',
            element: { biovers: 5, id: 6 },
            display: true,
            import: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/removePoi', {
      biovers: 3,
      id: 5,
    });
    expect(store.state.biovers.pois)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, pois: [] },
        {
          bioverId: 5,
          pois: [
            {
              name: 'Biovers5',
              element: { biovers: 5, id: 6 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Poi: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Poi: [{ biovers: 5 }] }]);
    store.dispatch('biovers/removePoi', {
      biovers: 5,
      id: 6,
    });
    expect(store.state.biovers.pois)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, pois: [] },
        {
          bioverId: 5,
          pois: [],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Poi: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Poi: [] }]);
  });

  it('test add new path action', async () => {
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    store.state.biovers.ownBiovers = [{ id: 3, Path: [] }];
    store.state.biovers.publicBiovers = [{ id: 5, Path: [] }];
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Path: [] }, title: 'Biovers3' },
      { biover: { id: 5, Path: [] }, title: 'Biovers5' },
    ];
    store.dispatch('biovers/addNewPath', {
      biovers: 3,
    });
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              name: 'Biovers3',
              element: { biovers: 3 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Path: [{ biovers: 3 }] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Path: [] }]);
    store.dispatch('biovers/addNewPath', {
      biovers: 5,
    });
    expect(store.state.biovers.paths)
      .toHaveLength(2)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              name: 'Biovers3',
              element: { biovers: 3 },
              display: true,
              import: false,
            },
          ],
        },
        {
          bioverId: 5,
          paths: [
            {
              name: 'Biovers5',
              element: { biovers: 5 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Path: [{ biovers: 3 }] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Path: [{ biovers: 5 }] }]);
  });

  it('test remove path action', async () => {
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Path: [{ id: 5 }] }, title: 'Biovers3' },
      { biover: { id: 5, Path: [{ id: 6 }] }, title: 'Biovers5' },
    ];
    store.state.biovers.ownBiovers = [{ id: 3, Path: [{ biovers: 3 }] }];
    store.state.biovers.publicBiovers = [{ id: 5, Path: [{ biovers: 5 }] }];
    store.state.biovers.paths = [
      {
        bioverId: 3,
        paths: [
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 5 },
            display: true,
            import: false,
          },
        ],
      },
      {
        bioverId: 5,
        paths: [
          {
            name: 'Biovers5',
            element: { biovers: 5, id: 6 },
            display: true,
            import: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/removePath', {
      biovers: 3,
      id: 5,
    });
    expect(store.state.biovers.paths)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, paths: [] },
        {
          bioverId: 5,
          paths: [
            {
              name: 'Biovers5',
              element: { biovers: 5, id: 6 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Path: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Path: [{ biovers: 5 }] }]);
    store.dispatch('biovers/removePath', {
      biovers: 5,
      id: 6,
    });
    expect(store.state.biovers.paths)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, paths: [] },
        {
          bioverId: 5,
          paths: [],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Path: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Path: [] }]);
  });

  it('test remove trace action', async () => {
    expect(store.state.biovers.traces).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, UserTrace: [{ id: 5 }] }, title: 'Biovers3' },
      { biover: { id: 5, UserTrace: [{ id: 6 }] }, title: 'Biovers5' },
    ];
    store.state.biovers.ownBiovers = [{ id: 3, UserTrace: [{ biovers: 3 }] }];
    store.state.biovers.publicBiovers = [
      { id: 5, UserTrace: [{ biovers: 5 }] },
    ];
    store.state.biovers.traces = [
      {
        bioverId: 3,
        traces: [
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 5 },
            display: true,
            import: false,
          },
        ],
      },
      {
        bioverId: 5,
        traces: [
          {
            name: 'Biovers5',
            element: { biovers: 5, id: 6 },
            display: true,
            import: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/removeTrace', {
      biovers: 3,
      id: 5,
    });
    expect(store.state.biovers.traces)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, traces: [] },
        {
          bioverId: 5,
          traces: [
            {
              name: 'Biovers5',
              element: { biovers: 5, id: 6 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, UserTrace: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, UserTrace: [{ biovers: 5 }] }]);
    store.dispatch('biovers/removeTrace', {
      biovers: 5,
      id: 6,
    });
    expect(store.state.biovers.traces)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, traces: [] },
        {
          bioverId: 5,
          traces: [],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, UserTrace: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, UserTrace: [] }]);
  });

  it('test remove event action', async () => {
    expect(store.state.biovers.events).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Event: [{ id: 5 }] }, title: 'Biovers3' },
      { biover: { id: 5, Event: [{ id: 6 }] }, title: 'Biovers5' },
    ];
    store.state.biovers.ownBiovers = [{ id: 3, Event: [{ biovers: 3 }] }];
    store.state.biovers.publicBiovers = [{ id: 5, Event: [{ biovers: 5 }] }];
    store.state.biovers.events = [
      {
        bioverId: 3,
        events: [
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 5 },
            display: true,
            import: false,
          },
        ],
      },
      {
        bioverId: 5,
        events: [
          {
            name: 'Biovers5',
            element: { biovers: 5, id: 6 },
            display: true,
            import: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/removeEvent', {
      biovers: 3,
      id: 5,
    });
    expect(store.state.biovers.events)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, events: [] },
        {
          bioverId: 5,
          events: [
            {
              name: 'Biovers5',
              element: { biovers: 5, id: 6 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Event: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Event: [{ biovers: 5 }] }]);
    store.dispatch('biovers/removeEvent', {
      biovers: 5,
      id: 6,
    });
    expect(store.state.biovers.events)
      .toHaveLength(2)
      .toEqual([
        { bioverId: 3, events: [] },
        {
          bioverId: 5,
          events: [],
        },
      ]);
    expect(store.state.biovers.ownBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 3, Event: [] }]);
    expect(store.state.biovers.publicBiovers)
      .toHaveLength(1)
      .toEqual([{ id: 5, Event: [] }]);
  });

  it('test update poi action', async () => {
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    store.state.biovers.pois = [
      {
        bioverId: 3,
        pois: [
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 5, value: 5 },
            display: true,
            import: false,
          },
        ],
      },
    ];
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 5, value: 5 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
    store.dispatch('biovers/updatePoiStore', {
      biovers: 3,
      id: 5,
      value: 55,
    });
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 5, value: 55 },
              display: true,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test import pois action without pois', async () => {
    expect(store.state.biovers.uploadInProgress).toBe(false);
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Path: [] }, title: 'Biovers3' },
    ];
    store.dispatch('biovers/importPois', []);
    expect(store.state.biovers.uploadInProgress).toBe(true);
    expect(store.state.biovers.pois)
      .toHaveLength(0)
      .toEqual([]);
  });

  it('test import pois action', async () => {
    expect(store.state.biovers.uploadInProgress).toBe(false);
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Poi: [] }, title: 'Biovers3' },
    ];
    store.dispatch('biovers/importPois', [
      {
        biovers: 3,
        id: 5,
        value: 55,
      },
      {
        biovers: 3,
        id: 6,
        value: 5,
      },
    ]);
    expect(store.state.biovers.uploadInProgress).toBe(true);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 5, value: 55 },
              display: true,
              import: true,
            },
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 6, value: 5 },
              display: true,
              import: true,
            },
          ],
        },
      ]);
  });

  it('test import paths action without paths', async () => {
    expect(store.state.biovers.uploadInProgress).toBe(false);
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Path: [] }, title: 'Biovers3' },
    ];
    store.dispatch('biovers/importPaths', []);
    expect(store.state.biovers.uploadInProgress).toBe(true);
    expect(store.state.biovers.paths)
      .toHaveLength(0)
      .toEqual([]);
  });

  it('test import paths action', async () => {
    expect(store.state.biovers.uploadInProgress).toBe(false);
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.bioversToDisplay = [
      { biover: { id: 3, Path: [] }, title: 'Biovers3' },
    ];
    store.dispatch('biovers/importPaths', [
      {
        biovers: 3,
        id: 5,
        value: 55,
      },
      {
        biovers: 3,
        id: 6,
        value: 5,
      },
    ]);
    expect(store.state.biovers.uploadInProgress).toBe(true);
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 5, value: 55 },
              display: true,
              import: true,
            },
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 6, value: 5 },
              display: true,
              import: true,
            },
          ],
        },
      ]);
  });

  it('test update import pois action', async () => {
    store.state.biovers.pois = [
      {
        bioverId: 3,
        pois: [
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 5, value: 55 },
            display: true,
            import: true,
          },
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 6, value: 5 },
            display: true,
            import: true,
          },
        ],
      },
    ];
    store.dispatch('biovers/updateImportPois', [
      {
        biovers: 3,
        id: 5,
        author: 1,
      },
      {
        biovers: 3,
        id: 6,
        User: 'test',
      },
    ]);
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 5, value: 55, author: 1 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 6, value: 5, User: 'test' },
              display: true,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test update import paths action', async () => {
    store.state.biovers.paths = [
      {
        bioverId: 3,
        paths: [
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 5, value: 55 },
            display: true,
            import: true,
          },
          {
            name: 'Biovers3',
            element: { biovers: 3, id: 6, value: 5 },
            display: true,
            import: true,
          },
        ],
      },
    ];
    store.dispatch('biovers/updateImportPaths', [
      {
        biovers: 3,
        id: 5,
        author: 1,
      },
      {
        biovers: 3,
        id: 6,
        User: 'test',
      },
    ]);
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 5, value: 55, author: 1 },
              display: true,
              import: false,
            },
            {
              name: 'Biovers3',
              element: { biovers: 3, id: 6, value: 5, User: 'test' },
              display: true,
              import: false,
            },
          ],
        },
      ]);
  });

  it('test upload done action', async () => {
    expect(store.state.biovers.uploadInProgress).toBe(false);
    expect(store.state.biovers.uploadDone).toBe(false);
    store.state.biovers.uploadInProgress = true;
    store.dispatch('biovers/uploadDone');
    expect(store.state.biovers.uploadInProgress).toBe(false);
    expect(store.state.biovers.uploadDone).toBe(true);
  });

  it('test reset upload action', async () => {
    store.state.biovers.uploadDone = true;
    expect(store.state.biovers.uploadDone).toBe(true);
    store.dispatch('biovers/resetUpload');
    expect(store.state.biovers.uploadDone).toBe(false);
  });

  it('test reset poi modification action', async () => {
    store.state.biovers.poisModification = true;
    expect(store.state.biovers.poisModification).toBe(true);
    store.dispatch('biovers/resetPoisModification');
    expect(store.state.biovers.poisModification).toBe(null);
  });

  it('test reset path modification action', async () => {
    store.state.biovers.pathsModification = true;
    expect(store.state.biovers.pathsModification).toBe(true);
    store.dispatch('biovers/resetPathsModification');
    expect(store.state.biovers.pathsModification).toBe(null);
  });

  it('test select all pois action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.pois = [
      {
        bioverId: 3,
        pois: [
          {
            display: false,
          },
          {
            display: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/selectAllPois');
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              display: true,
            },
            {
              display: true,
            },
          ],
        },
      ]);
  });

  it('test unselect all pois action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.pois = [
      {
        bioverId: 3,
        pois: [
          {
            display: true,
          },
          {
            display: true,
          },
        ],
      },
    ];
    store.dispatch('biovers/unselectAllPois');
    expect(store.state.biovers.pois)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          pois: [
            {
              display: false,
            },
            {
              display: false,
            },
          ],
        },
      ]);
  });

  it('test select all paths action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.paths = [
      {
        bioverId: 3,
        paths: [
          {
            display: false,
          },
          {
            display: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/selectAllPaths');
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              display: true,
            },
            {
              display: true,
            },
          ],
        },
      ]);
  });

  it('test unselect all paths action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.paths = [
      {
        bioverId: 3,
        paths: [
          {
            display: true,
          },
          {
            display: true,
          },
        ],
      },
    ];
    store.dispatch('biovers/unselectAllPaths');
    expect(store.state.biovers.paths)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          paths: [
            {
              display: false,
            },
            {
              display: false,
            },
          ],
        },
      ]);
  });

  it('test select all events action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.events = [
      {
        bioverId: 3,
        events: [
          {
            display: false,
          },
          {
            display: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/selectAllEvents');
    expect(store.state.biovers.events)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          events: [
            {
              display: true,
            },
            {
              display: true,
            },
          ],
        },
      ]);
  });

  it('test unselect all events action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.events = [
      {
        bioverId: 3,
        events: [
          {
            display: true,
          },
          {
            display: true,
          },
        ],
      },
    ];
    store.dispatch('biovers/unselectAllEvents');
    expect(store.state.biovers.events)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          events: [
            {
              display: false,
            },
            {
              display: false,
            },
          ],
        },
      ]);
  });

  it('test select all traces action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.traces = [
      {
        bioverId: 3,
        traces: [
          {
            display: false,
          },
          {
            display: false,
          },
        ],
      },
    ];
    store.dispatch('biovers/selectAllTraces');
    expect(store.state.biovers.traces)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          traces: [
            {
              display: true,
            },
            {
              display: true,
            },
          ],
        },
      ]);
  });

  it('test unselect all traces action', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.traces = [
      {
        bioverId: 3,
        traces: [
          {
            display: true,
          },
          {
            display: true,
          },
        ],
      },
    ];
    store.dispatch('biovers/unselectAllTraces');
    expect(store.state.biovers.traces)
      .toHaveLength(1)
      .toEqual([
        {
          bioverId: 3,
          traces: [
            {
              display: false,
            },
            {
              display: false,
            },
          ],
        },
      ]);
  });

  it('test reset store action', async () => {
    store.state.biovers.ownBiovers = [1];
    store.state.biovers.publicBiovers = [2];
    store.state.biovers.bioversToDisplay = [3];
    store.state.biovers.currentBioversId = 4;
    store.state.biovers.pois = [5];
    store.state.biovers.poisModification = { id: 6 };
    store.state.biovers.pathsModification = { id: 7 };
    store.state.biovers.paths = [8];
    store.state.biovers.traces = [9];
    store.state.biovers.uploadInProgress = true;
    store.state.biovers.uploadDone = true;
    store.dispatch('biovers/resetBiovers');
    expect(store.state.biovers.ownBiovers).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.publicBiovers).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.bioversToDisplay).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.pois).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.paths).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.poisModification).toEqual({});
    expect(store.state.biovers.pathsModification).toEqual({});
    expect(store.state.biovers.traces).toHaveLength(0).toEqual([]);
    expect(store.state.biovers.currentBioversId).toBe(-1);
    expect(store.state.biovers.uploadInProgress).toBe(false);
    expect(store.state.biovers.uploadDone).toBe(false);
  });

  it('test filter action', async () => {
    expect(store.state.biovers.filter).toBe('');
    store.dispatch('biovers/filter', 'jjjjj');
    expect(store.state.biovers.filter).toBe('jjjjj');
  });

  it('test copy poi action', async () => {
    expect(store.state.copyElement).toBeUndefined();
    store.dispatch('biovers/copyPoi', { id: 5 });
    expect(store.state.biovers.copyElement).toEqual({
      type: 'POI',
      element: { id: 5 },
    });
    expect(store.getters['biovers/getCopyElement']).toEqual({
      type: 'POI',
      element: { id: 5 },
    });
  });

  it('test copy path action', async () => {
    expect(store.state.copyElement).toBeUndefined();
    store.dispatch('biovers/copyPath', { id: 5 });
    expect(store.state.biovers.copyElement).toEqual({
      type: 'PATH',
      element: { id: 5 },
    });
    expect(store.getters['biovers/getCopyElement']).toEqual({
      type: 'PATH',
      element: { id: 5 },
    });
  });

  it('test bioverIsEditable getters', async () => {
    store.state.biovers.publicBiovers = [
      {
        id: 1,
        is_editable: true,
      },
      {
        id: 2,
        is_editable: false,
      },
    ];
    store.state.biovers.ownBiovers = [
      {
        id: 3,
        is_editable: true,
      },
    ];
    const isEditable = store.getters['biovers/bioverIsEditable'];
    expect(isEditable(1)).toBe(true);
    expect(isEditable(2)).toBe(false);
    expect(isEditable(3)).toBe(true);
  });

  it('test own or public getters', async () => {
    store.state.biovers.publicBiovers = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    store.state.biovers.ownBiovers = [
      {
        id: 3,
      },
    ];
    const ownOrPublic = store.getters['biovers/ownOrPublic'];
    expect(ownOrPublic(1)).toBe('public');
    expect(ownOrPublic(2)).toBe('public');
    expect(ownOrPublic(3)).toBe('own');
  });

  it('test getTracesForDisplay getters', async () => {
    const { username } = useStore();
    username.value = 'test';
    store.state.biovers.traces = [
      {
        bioverId: 3,
        traces: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    expect(store.getters['biovers/getTracesForDisplay'])
      .toHaveLength(1)
      .toEqual([
        [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
        ],
      ]);
  });

  it('test getEvents getters', async () => {
    const { username } = useStore();
    username.value = 'test';
    store.state.biovers.events = [
      {
        bioverId: 3,
        events: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    expect(store.getters['biovers/getEvents'])
      .toHaveLength(1)
      .toEqual([
        {
          id: 1,
          element: {
            User: {
              username: 'test',
            },
          },
        },
      ]);
  });

  it('test getPaths getters', async () => {
    store.state.biovers.paths = [
      {
        bioverId: 3,
        paths: [
          {
            name: 'Biovers3',
            element: { id: 5 },
            display: true,
            import: false,
          },
          {
            name: 'Biovers3',
            element: { id: 9 },
            display: true,
            import: false,
          },
        ],
      },
    ];
    expect(store.getters['biovers/getPaths'])
      .toHaveLength(2)
      .toEqual([
        {
          name: 'Biovers3',
          element: { id: 5 },
          display: true,
          import: false,
        },
        {
          name: 'Biovers3',
          element: { id: 9 },
          display: true,
          import: false,
        },
      ]);
  });

  it('test getPois getters', async () => {
    store.state.biovers.pois = [
      {
        bioverId: 3,
        pois: [
          {
            name: 'Biovers3',
            element: { id: 5, title: 'Biovers' },
            display: true,
            import: false,
          },
          {
            name: 'Biovers3',
            element: { id: 9 },
            display: true,
            import: false,
          },
        ],
      },
    ];
    expect(store.getters['biovers/getPois'])
      .toHaveLength(1)
      .toEqual([
        {
          name: 'Biovers3',
          element: { id: 5, title: 'Biovers' },
          display: true,
          import: false,
        },
      ]);
  });

  it('test getEventByBioversAndUser getters', async () => {
    const { username } = useStore();
    username.value = 'test';
    store.state.biovers.events = [
      {
        bioverId: 3,
        events: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    const getEventByBioversAndUser =
      store.getters['biovers/getEventByBioversAndUser'];
    expect(getEventByBioversAndUser(3))
      .toHaveLength(1)
      .toEqual([
        {
          id: 1,
          element: {
            User: {
              username: 'test',
            },
          },
        },
      ]);

    expect(getEventByBioversAndUser(6)).toHaveLength(0).toEqual([]);
  });

  it('test getEventByBiovers getters', async () => {
    store.state.biovers.events = [
      {
        bioverId: 3,
        events: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    const getEventByBiovers = store.getters['biovers/getEventByBiovers'];
    expect(getEventByBiovers(3))
      .toHaveLength(2)
      .toEqual([
        {
          id: 1,
          element: {
            User: {
              username: 'test',
            },
          },
        },
        {
          id: 2,
          element: {
            User: {
              username: 'aaaa',
            },
          },
        },
      ]);

    expect(getEventByBiovers(6)).toHaveLength(0).toEqual([]);
  });

  it('test getTraceById getters', async () => {
    store.state.biovers.currentBioversId = 3;
    store.state.biovers.traces = [
      {
        bioverId: 3,
        traces: [
          {
            id: 1,
            element: {
              id: 1,
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              id: 2,
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    const getTraceById = store.getters['biovers/getTraceById'];
    expect(getTraceById(2))
      .toHaveLength(1)
      .toEqual([
        {
          id: 2,
          element: {
            id: 2,
            User: {
              username: 'aaaa',
            },
          },
        },
      ]);
    expect(getTraceById(6)).toHaveLength(0).toEqual([]);
    store.state.biovers.currentBioversId = 6;
    expect(getTraceById(6)).toBe(-1);
  });

  it('test getTraceByBioversAndUser getters', async () => {
    const { username } = useStore();
    username.value = 'test';
    store.state.biovers.traces = [
      {
        bioverId: 3,
        traces: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    const getTraceByBioversAndUser =
      store.getters['biovers/getTraceByBioversAndUser'];
    expect(getTraceByBioversAndUser(3))
      .toHaveLength(1)
      .toEqual([
        {
          id: 1,
          element: {
            User: {
              username: 'test',
            },
          },
        },
      ]);

    expect(getTraceByBioversAndUser(6)).toHaveLength(0).toEqual([]);
  });

  it('test getTraceByBiovers getters', async () => {
    store.state.biovers.traces = [
      {
        bioverId: 3,
        traces: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    const getTraceByBiovers = store.getters['biovers/getTraceByBiovers'];
    expect(getTraceByBiovers(3))
      .toHaveLength(2)
      .toEqual([
        {
          id: 1,
          element: {
            User: {
              username: 'test',
            },
          },
        },
        {
          id: 2,
          element: {
            User: {
              username: 'aaaa',
            },
          },
        },
      ]);

    expect(getTraceByBiovers(6)).toHaveLength(0).toEqual([]);
  });

  it('test getPathsByBiover getters', async () => {
    store.state.biovers.paths = [
      {
        bioverId: 3,
        paths: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    const getPathsByBiover = store.getters['biovers/getPathsByBiover'];
    expect(getPathsByBiover(3))
      .toHaveLength(2)
      .toEqual([
        {
          id: 1,
          element: {
            User: {
              username: 'test',
            },
          },
        },
        {
          id: 2,
          element: {
            User: {
              username: 'aaaa',
            },
          },
        },
      ]);
    expect(getPathsByBiover(6)).toHaveLength(0).toEqual([]);
    store.state.biovers.filter = 'aa';
    expect(getPathsByBiover(3))
      .toHaveLength(1)
      .toEqual([
        {
          id: 2,
          element: {
            User: {
              username: 'aaaa',
            },
          },
        },
      ]);
  });

  it('test getPoisByBiover getters', async () => {
    store.state.biovers.pois = [
      {
        bioverId: 3,
        pois: [
          {
            id: 1,
            element: {
              User: {
                username: 'test',
              },
            },
          },
          {
            id: 2,
            element: {
              User: {
                username: 'aaaa',
              },
            },
          },
        ],
      },
    ];
    const getPoisByBiover = store.getters['biovers/getPoisByBiover'];
    expect(getPoisByBiover(3))
      .toHaveLength(2)
      .toEqual([
        {
          id: 1,
          element: {
            User: {
              username: 'test',
            },
          },
        },
        {
          id: 2,
          element: {
            User: {
              username: 'aaaa',
            },
          },
        },
      ]);
    expect(getPoisByBiover(6)).toHaveLength(0).toEqual([]);
    store.state.biovers.filter = 'aa';
    expect(getPoisByBiover(3))
      .toHaveLength(1)
      .toEqual([
        {
          id: 2,
          element: {
            User: {
              username: 'aaaa',
            },
          },
        },
      ]);
  });

  it('test getPoisByBiover getters', async () => {
    store.state.biovers.bioversToDisplay = [
      {
        biover: {
          id: 3,
        },
      },
      {
        biover: {
          id: 9,
        },
      },
    ];
    const getDisplayedBioversById =
      store.getters['biovers/getDisplayedBioversById'];
    expect(getDisplayedBioversById(3)).toEqual({
      biover: {
        id: 3,
      },
    });

    expect(getDisplayedBioversById(6)).toBeUndefined();
  });
});

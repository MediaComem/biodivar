import { beforeEach, describe, it, expect } from 'vitest';

import { useStore } from '../../src/composables/store.js';

describe('Composable store test suite', () => {
  beforeEach(() => {
    useStore().biovers.value = [];
    useStore().selectedBiovers.value = null;
  });

  it('Test addPoiInBiovers action without selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().addPoiInBiovers({ id: 5, biovers: 3 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [
          { id: 4, biovers: 3 },
          { id: 5, biovers: 3 },
        ],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toBeNull();
  });

  it('Test addPoiInBiovers action with selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().selectedBiovers.value = {
      id: 3,
      name: 'Biovers3',
      Poi: [{ id: 4, biovers: 3 }],
      Path: [],
      UserTrace: [],
      Event: [],
    };
    useStore().addPoiInBiovers({ id: 5, biovers: 3 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [
          { id: 4, biovers: 3 },
          { id: 5, biovers: 3 },
        ],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toEqual({
      id: 3,
      name: 'Biovers3',
      Poi: [
        { id: 4, biovers: 3 },
        { id: 5, biovers: 3 },
      ],
      Path: [],
      UserTrace: [],
      Event: [],
    });
  });

  it('Test updatePoiInBiovers action without selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3, value: 5 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().updatePoiInBiovers({ id: 4, biovers: 3, value: 55 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3, value: 55 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toBeNull();
  });

  it('Test updatePoiInBiovers action with selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3, value: 5 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().selectedBiovers.value = {
      id: 3,
      name: 'Biovers3',
      Poi: [{ id: 4, biovers: 3, value: 5 }],
      Path: [],
      UserTrace: [],
      Event: [],
    };
    useStore().updatePoiInBiovers({ id: 4, biovers: 3, value: 55 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3, value: 55 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toEqual({
      id: 3,
      name: 'Biovers3',
      Poi: [{ id: 4, biovers: 3, value: 55 }],
      Path: [],
      UserTrace: [],
      Event: [],
    });
  });

  it('Test deletePoiInBiovers action without selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().deletePoiInBiovers({ id: 4, biovers: 3, value: 5 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 5, biovers: 3, value: 55 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toBeNull();
  });

  it('Test deletePoiInBiovers action with selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().selectedBiovers.value = {
      id: 3,
      name: 'Biovers3',
      Poi: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
      Path: [],
      UserTrace: [],
      Event: [],
    };
    useStore().deletePoiInBiovers({ id: 4, biovers: 3, value: 5 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [{ id: 5, biovers: 3, value: 55 }],
        Path: [],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toEqual({
      id: 3,
      name: 'Biovers3',
      Poi: [{ id: 5, biovers: 3, value: 55 }],
      Path: [],
      UserTrace: [],
      Event: [],
    });
  });

  it('Test addPathInBiovers action without selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3 }],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().addPathInBiovers({ id: 5, biovers: 3 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [
          { id: 4, biovers: 3 },
          { id: 5, biovers: 3 },
        ],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toBeNull();
  });

  it('Test addPathInBiovers action with selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3 }],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().selectedBiovers.value = {
      id: 3,
      name: 'Biovers3',
      Poi: [],
      Path: [{ id: 4, biovers: 3 }],
      UserTrace: [],
      Event: [],
    };
    useStore().addPathInBiovers({ id: 5, biovers: 3 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [
          { id: 4, biovers: 3 },
          { id: 5, biovers: 3 },
        ],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toEqual({
      id: 3,
      name: 'Biovers3',
      Poi: [],
      Path: [
        { id: 4, biovers: 3 },
        { id: 5, biovers: 3 },
      ],
      UserTrace: [],
      Event: [],
    });
  });

  it('Test updatePathInBiovers action without selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3, value: 5 }],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().updatePathInBiovers({ id: 4, biovers: 3, value: 55 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3, value: 55 }],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toBeNull();
  });

  it('Test updatePathInBiovers action with selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3, value: 5 }],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().selectedBiovers.value = {
      id: 3,
      name: 'Biovers3',
      Poi: [],
      Path: [{ id: 4, biovers: 3, value: 5 }],
      UserTrace: [],
      Event: [],
    };
    useStore().updatePathInBiovers({ id: 4, biovers: 3, value: 55 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3, value: 55 }],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toEqual({
      id: 3,
      name: 'Biovers3',
      Poi: [],
      Path: [{ id: 4, biovers: 3, value: 55 }],
      UserTrace: [],
      Event: [],
    });
  });

  it('Test deletePathInBiovers action without selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().deletePathInBiovers({ id: 4, biovers: 3, value: 5 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 5, biovers: 3, value: 55 }],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toBeNull();
  });

  it('Test deletePathInBiovers action with selected biovers', () => {
    useStore().biovers.value = [
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
        UserTrace: [],
        Event: [],
      },
    ];
    useStore().selectedBiovers.value = {
      id: 3,
      name: 'Biovers3',
      Poi: [],
      Path: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
      UserTrace: [],
      Event: [],
    };
    useStore().deletePathInBiovers({ id: 4, biovers: 3, value: 5 });
    expect(useStore().biovers.value).toEqual([
      {
        id: 3,
        name: 'Biovers3',
        Poi: [],
        Path: [{ id: 5, biovers: 3, value: 55 }],
        UserTrace: [],
        Event: [],
      },
    ]);
    expect(useStore().selectedBiovers.value).toEqual({
      id: 3,
      name: 'Biovers3',
      Poi: [],
      Path: [{ id: 5, biovers: 3, value: 55 }],
      UserTrace: [],
      Event: [],
    });
  });

  it('Test resetSelectedBiovers action with selected biovers', () => {
    useStore().selectedBiovers.value = {
      id: 3,
      name: 'Biovers3',
      Poi: [],
      Path: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
      UserTrace: [{ id: 4, biovers: 3, value: 5 }, { id: 5, biovers: 3, value: 55 }],
      Event: [],
    };
    useStore().resetSelectedBiovers();
    expect(useStore().selectedBiovers.value).toBeNull();
  });
});

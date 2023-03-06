import { Biovers } from '@prisma/client';
import { BioversModel } from '../../src/types/biovers-model';
import { PathModel } from '../../src/types/path-model';
import { PoiModel } from '../../src/types/poi-model';
import { 
    preparePoisFromBioversDuplication,
    preparePathsFromBioversDuplication
} from '../../src/utils/duplicate';

const biovers: BioversModel = {
    id: 1,
    name: 'test',
    owner: 1,
    creation_date: new Date(),
}

const test_poi = {
    title: "POI 1",
    subtitle: '',
    author: 1,
    creation_date: new Date(),
    biovers: 1,
    radius: 15.5,
    style_type: "sphere",
    style_stroke_width: 1.2,
    stroke_color: '#FFFFFF',
    stroke_opacity: 95,
    extrusion: 0.0,
    fill_type: true,
    fill_color: '#FFEEFF',
    fill_opacity: 99,
    amplitude: 22.3,
    scope: 455.5,
    wireframe: false,
    elevation: 0,
    trigger_mode: "location",
    media: undefined,
    metadata: '',
    coordinate: {
        long: 0,
        lat: 0,
        alt: 0,
        creation_date: new Date(),
    },
    symbol: {}
};



const coordinate_test = {
    id: 1,
    long: 12.2,
    lat: 13.3,
    alt: 14.4,
    creation_date: new Date(),
};

const test_path = {
    author: 1,
    creation_date: new Date(),
    biovers: 2,
    style_type: 'sphere',
    style_stroke: true,
    style_stroke_width: 1.2,
    style_elevation: 16.4,
    amplitude: 22.3,
    style_is_visible: true,
    scope: 455.5,
    coordinate: {},
    metadata: {},
};

describe('Test duplication utils functions', () => {

    it('POI with less elements', async () => {
        const poi = test_poi;
        const result = preparePoisFromBioversDuplication(biovers as Biovers, poi as PoiModel, 2);

        expect(result.id).toBe(undefined);
        expect(result.title).toEqual('POI 1');
        expect(result.biovers).toBe(1);
        expect(result.author).toBe(2);
        expect(result.last_contributor).toBe(undefined);
        expect(result.subtitle).toBe('');
        expect(result.metadata).toBe('');
        expect(result.coordinate?.alt).toBe(0);
        expect(result.coordinate?.long).toBe(0);
        expect(result.coordinate?.lat).toBe(0);
    });

    it('POI with full elements', async () => {
        const poi = test_poi;
        poi.symbol = {
            media_type: 'Video',
            url: '/specific/path',
            elevation_ground: 355.36,
            is_facing_user: false,
            is_visible: true,
        };
        poi.coordinate = {
            long: 12.2,
            lat: 13.3,
            alt: 14.4,
            creation_date: new Date(),
        };
        poi.subtitle = 'Test 2';
        poi.metadata = 'abc';
        const result = preparePoisFromBioversDuplication(biovers as Biovers, poi as PoiModel, 2);

        expect(result.id).toBe(undefined);
        expect(result.title).toEqual('POI 1');
        expect(result.biovers).toBe(1);
        expect(result.author).toBe(2);
        expect(result.last_contributor).toBe(undefined);
        expect(result.subtitle).toEqual('Test 2');
        expect(result.metadata).toEqual('abc');
        expect(result.coordinate?.alt).toBe(14.4);
    });

    it('PATH with less elements', async () => {
        const path = test_path;
        const result = preparePathsFromBioversDuplication(biovers as Biovers, path as PathModel, 2);

        expect(result.id).toBe(undefined);
        expect(result.biovers).toBe(1);
        expect(result.author).toBe(2);
        expect(result.last_contributor).toBe(undefined);
        expect(result.metadata).toBe('');
        expect(result.coordinate).toBe(undefined);
    });

    it('PATH with full elements', async () => {
        const path = test_path;
        path.metadata = 'abc';
        path.coordinate = {'0': coordinate_test, '1': coordinate_test};
        const result = preparePathsFromBioversDuplication(biovers as Biovers, path as PathModel, 2);

        expect(result.id).toBe(undefined);
        expect(result.biovers).toBe(1);
        expect(result.author).toBe(2);
        expect(result.last_contributor).toBe(undefined);
        expect(result.metadata).toEqual('abc');
        result.coordinate?.forEach((c) => {
            expect(c.id).toBe(undefined);
            expect(c.alt).toBe(14.4);
        })
    });

});
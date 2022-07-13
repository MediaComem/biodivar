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
    title_is_visible: true,
    subtitle: {},
    author: 1,
    biovers: 2,
    creation_date: new Date(),
    radius: 15.5,
    style_type: "sphere",
    style_stroke: true,
    style_stroke_width: 1.2,
    style_fill: false,
    style_elevation: 16.4,
    style_elevation_ground: 32.4,
    style_noise: 22.3,
    style_is_visible: true,
    visible_from: 455.5,
    trigger_mode: "location",
    media: undefined,
    metadata: {},
    coordinate: {},
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
    style_elevation_ground: 32.4,
    style_noise: 22.3,
    style_is_visible: true,
    visible_from: 455.5,
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
        expect(result.symbol).toBe(undefined);
        expect(result.coordinate).toBe(undefined);
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
        expect(result.symbol?.media_type).toEqual('Video');
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
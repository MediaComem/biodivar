import { ServerRoute } from '@hapi/hapi';

import AdmZip from 'adm-zip';

import os from 'os';
import fs from 'fs';
import path from 'path';

import {
  createPoi,
  createPoiFromImport,
  deletePoi,
  getPoiById,
  getPoiByTitle,
  updatePoi,
} from '../controller/poi-controller';
import { PoiModel, PoiModels } from '../types/poi-model';

import {
  failureResponse,
  errorResponse,
  successResponse,
  successWithoutContentResponse,
} from '../utils/response';
import { computeGeoJSONFromPOIs } from '../utils/geojson';
import { Poi } from '@prisma/client';
import { GeojsonPoisModel } from '../types/geojson-pois-model';
import { MediaModel } from '../types/media_model';

export const poiRoutes: ServerRoute[] = [];

poiRoutes.push({
  method: 'GET',
  path: '/poi/id',
  handler: async function (request, h) {
    const poi = await getPoiById(
      request.server.app.prisma,
      +request.query.id,
    );
    if (poi) {
      return successResponse(h, 'Get POI done successfully', poi);
    } else {
      return successWithoutContentResponse(h, 'Get POI done successfully');
    }
  },
});

poiRoutes.push({
  method: 'GET',
  path: '/poi/title',
  handler: async function (request, h) {
    const poi = await getPoiByTitle(
      request.server.app.prisma,
      request.query.title,
    );
    if (poi) {
      return successResponse(h, 'Get POI done successfully', poi);
    } else {
      return successWithoutContentResponse(h, 'Get POI done successfully');
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/create',
  handler: async function (request, h) {
    try {
      const poi = request.payload as PoiModel;
      if (!poi.author) {
        poi.author = request.state.biodivar.id;
      }
      const pois = await createPoi(
        request.server.app.prisma,
        poi,
        request.server.app.logger
      );
      if (pois) {
        return successResponse(h, 'POI creation done successfully', pois);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/creates',
  handler: async function (request, h) {
    try {
      const pois = request.payload as PoiModels;
      const results = [];
      for (let i = 0; i < pois.length; i++) {
        if (!pois[i].author) {
          pois[i].author = request.state.biodivar.id;
        }
        const result = await createPoi(
          request.server.app.prisma,
          pois[i],
          request.server.app.logger
        );
        results.push(result);
      }
      if (results.length > 0) {
        return successResponse(h, 'POI creation done successfully', results);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/update',
  handler: async function (request, h) {
    try {
      const poi = request.payload as PoiModel;
      if (!poi.author) {
        poi.author = request.state.biodivar.id;
      }
      const pois = await updatePoi(
        request.server.app.prisma,
        poi,
        request.server.app.logger
      );
      if (pois) {
        return successResponse(h, 'POI update done successfully', pois);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/delete',
  handler: async function (request, h) {
    try {
      const poi = request.payload as PoiModel;
      if (!poi.author) {
        poi.author = request.state.biodivar.id;
      }
      const pois = await deletePoi(
        request.server.app.prisma,
        poi,
        request.server.app.logger
      );
      if (pois) {
        return successResponse(h, 'POI deletion done successfully', pois);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/import',
  options: {
    payload: {
      maxBytes: 1000 * 1000 * 50,
      parse: true,
      allow: 'multipart/form-data',
      multipart: { output: 'stream' },
    }
  },
  handler: async function (request, h) {
    let result;
    try {
      const payload: any = request.payload;
      const file = payload.file;
      let tmpDir: string = '';
      try {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir()));
        const zip = new AdmZip(file._data);
        zip.extractAllTo(tmpDir, true);
        const files = fs.readdirSync(tmpDir);
       for (const file of files) {
          if (file != '__MACOSX') {
            if (fs.lstatSync(path.join(tmpDir, file)).isDirectory()) {
              const zipFolder = fs.readdirSync(path.join(tmpDir, file));
              for (const element of zipFolder) {
                if (element.endsWith('.json')) {
                  const importedJson = JSON.parse(fs.readFileSync(path.join(tmpDir, file, element)).toString());
                  result = await createPoiFromImport(importedJson['features'], path.join(tmpDir, file), request.state.biodivar.id, request.server.app.prisma, request.server.app.logger);
                }
              }
            } else {
              if (file.endsWith('.json')) {
                const importedJson = JSON.parse(fs.readFileSync(path.join(tmpDir, file)).toString());
                result = await createPoiFromImport(importedJson['features'], path.join(tmpDir), request.state.biodivar.id, request.server.app.prisma, request.server.app.logger);
              }
            }
            
          }
        }
      }
      catch (error) {
        console.log(error);
        throw new Error('Cannot store the image');
      }
      try {
        if (tmpDir) {
          fs.rmSync(tmpDir, { recursive: true });
        }
      }
      catch (e) {
        console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
      }
      return successResponse(h, 'Symbol creation done successfully', result);
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'GET',
  path: '/poi/export',
  handler: async function (request, h) {
    const ids = request.query.ids;
    const pois: Array<Poi> = [];
    if (ids) {
      for (const id of ids.split(',')) {
        try {
          const poi = await getPoiById(
            request.server.app.prisma,
            +id,
          );
          if (poi) {
            pois.push(poi);
          }
        }
        catch (error) {
          console.log(error)
        }
      }
    }
    const json = computeGeoJSONFromPOIs(pois as PoiModels)
    let tmpDir: string = '';
    try {
      tmpDir = path.join(process.env.EXPORT_PATH || '', request.state.biodivar.id.toString());
      fs.mkdirSync(tmpDir, {recursive: true});
      const zip = new AdmZip();
      console.log(json);
      const jsonObject = JSON.parse(json);
      if (jsonObject && jsonObject['features']) {
        jsonObject['features'].forEach((feature:GeojsonPoisModel) => {
          if (feature.properties.map_url) {
            zip.addLocalFile(feature.properties.map_url);
            feature.properties.map_url = path.basename(feature.properties.map_url);
          }
          if (feature.properties.media) {
            feature.properties.media.forEach((media:MediaModel) => {
              if (media.url) {
                zip.addLocalFile(media.url);
                media.url = path.basename(media.url);
              }
            })
          } 
        })
      }
      zip.addFile("export_pois.json", Buffer.from(JSON.stringify(jsonObject), "utf8"));
      zip.writeZip(path.join(tmpDir, 'export_pois.zip'));
      return h.file(path.join(tmpDir, 'export_pois.zip'));
    } catch (error) {
      console.log(error);
    }
    return errorResponse(h, 'Cannot create zip, please contact and administrator');
  },
});

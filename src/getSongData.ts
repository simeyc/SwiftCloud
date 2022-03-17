import Ajv from 'ajv';
import { SongData, QueryOpts } from './types';
import { allSongData } from './allSongData';

const ajv = new Ajv({ strictTypes: false });

const filterBySchema = (songs: SongData[], schema: any) => {
    const sch = JSON.parse(schema);
    const validate = ajv.compile({
        type: 'object',
        required: Object.keys(sch),
        properties: sch,
    });
    return songs.filter((song) => validate(song));
};

const condenseByKeys = (data: SongData[], includeKeys: string | string[]) => {
    let condensedData: SongData[];
    if (Array.isArray(includeKeys)) {
        condensedData = data.map((d) => {
            const reducedData: { [key: string]: string | number } = {};
            includeKeys.forEach((key: keyof SongData) => {
                reducedData[key] = d[key];
            });
            return reducedData;
        });
    } else {
        const key = includeKeys as keyof SongData;
        condensedData = data.map((d) => ({ [key]: d[key] }));
    }
    return condensedData;
};

export const getSongData = (query: QueryOpts) => {
    const { schema, includeKeys, sortReverse } = query;
    let data: SongData[] = schema
        ? filterBySchema(allSongData, query.schema)
        : allSongData;
    if (includeKeys) {
        data = condenseByKeys(data, includeKeys);
    }
    const sortKey = query.sortKey as keyof SongData;
    if (sortKey) {
        data = data.sort(({ [sortKey]: a }, { [sortKey]: b }) =>
            a > b ? 1 : -1
        );
        sortReverse === 'true' && data.reverse();
    }
    const maxCount = parseInt(query.maxCount);
    if (maxCount) {
        data = data.slice(0, maxCount);
    }
    return data;
};

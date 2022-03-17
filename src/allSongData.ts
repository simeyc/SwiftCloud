import axios from 'axios';
import { SONG_DATA_URL } from './constants';
import { SongRecord, CsvData } from './types';
import { parse } from 'csv-parse/sync';

export let allSongData: SongRecord[] = [];

const sanitizeData = (data: string) => {
    const titlesEndIdx = data.indexOf('\n');
    const titles = data.slice(0, titlesEndIdx);
    // sanitize keys to camelCase
    const keys = titles.toLowerCase().replace(/[^a-z0-9_,"]+/g, '_');
    // replace in-field newlines with spaces
    const content = data.slice(titlesEndIdx + 1).replace(/([^"])\n/g, '$1 ');
    return keys + '\n' + content;
};

const formatData = (data: CsvData) => {
    const formattedData: SongRecord[] = data.map((d) => {
        const plays_june = parseInt(d.plays_june);
        const plays_july = parseInt(d.plays_july);
        const plays_august = parseInt(d.plays_august);
        return {
            ...d,
            year: parseInt(d.year),
            plays_june,
            plays_july,
            plays_august,
            plays_total: plays_june + plays_july + plays_august,
        };
    });
    return formattedData;
};

export const initialize = () =>
    axios
        .get(SONG_DATA_URL)
        .then((response) => response.data)
        .then(sanitizeData)
        .then((data) => parse(data, { columns: true }))
        .then(formatData)
        .then((data) => {
            allSongData = data;
        });

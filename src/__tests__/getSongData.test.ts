import { getSongData } from '../getSongData';

jest.mock('../allSongData', () => ({
    allSongData: [
        {
            song: 'mock-song-1',
            artist: 'mock-artist-1',
            album: 'mock-album-1',
            writer: 'mock-writer-1',
            year: 2001,
            plays_june: 1,
            plays_july: 2,
            plays_august: 3,
            plays_total: 4,
        },
        {
            song: 'mock-song-2',
            artist: 'mock-artist-2',
            album: 'mock-album-2',
            writer: 'mock-writer-2',
            year: 2002,
            plays_june: 5,
            plays_july: 6,
            plays_august: 7,
            plays_total: 8,
        },
        {
            song: 'mock-song-3',
            artist: 'mock-artist-3',
            album: 'mock-album-3',
            writer: 'mock-writer-3',
            year: 2003,
            plays_june: 9,
            plays_july: 10,
            plays_august: 11,
            plays_total: 12,
        },
        {
            song: 'mock-song-4',
            artist: 'mock-artist-4',
            album: 'mock-album-4',
            writer: 'mock-writer-4',
            year: 2003,
            plays_june: 13,
            plays_july: 14,
            plays_august: 15,
            plays_total: 16,
        },
    ],
}));

describe('getSongData', () => {
    it('should return only songs matching the schema', () => {
        const schema = JSON.stringify({
            year: { minimum: 2002 },
            plays_june: { maximum: 9 },
        });
        const includeKeys = ['song', 'album'];
        const result = getSongData({ schema, includeKeys });
        const expected = [
            {
                song: 'mock-song-2',
                album: 'mock-album-2',
            },
            {
                song: 'mock-song-3',
                album: 'mock-album-3',
            },
        ];
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it.skip('should pass other, more targeted tests', () => {
        // TODO
    });
});

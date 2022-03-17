export type SongRecord = {
    song: string;
    artist: string;
    writer: string;
    album: string;
    year: number;
    plays_june: number;
    plays_july: number;
    plays_august: number;
    plays_total: number;
};

export type SongData = Partial<SongRecord>;

export type CsvData = Record<keyof SongData, string>[];

export type QueryOpts = {
    schema?: string;
    sortKey?: string;
    sortReverse?: string;
    includeKeys?: string | string[];
    maxCount?: string;
};

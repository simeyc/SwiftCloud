# SwiftCloud

## Installation

Install NodeJS and NPM: https://nodejs.org/en/download/

Open a command line terminal and navigate to the project folder.

Install and run the project:

-   npm i
-   npm run start

The server will be running on port 8000.

## Run unit tests

-   npm run test

## Demo Usage

Open your browser and navigate to the following URL:

-   http://localhost:8000/tswizzle? (+ query)

Query parameters:

-   schema: JSON schema properties by key, validating song objects
-   includeKeys: Key or array of keys to be included in response data
-   sortKey: Key of field to sort by
-   sortReverse: 'true' to reverse sort
-   maxCount: Integer maximum number of items to be included in response

(Data keys: song, artist, album, writer, year, plays_june, plays_july, plays_august, plays_total).

Examples (encoded URLs):

-   Writers and years for all songs:
    http://localhost:8000/tswizzle?includeKeys=writer&&includeKeys=year
-   All data for top 10 most played songs released since 2018:
    http://localhost:8000/tswizzle?sortKey=plays_total&sortReverse=true&maxCount=10&schema=%7B%22year%22%3A%7B%22minimum%22%3A2018%7D%7D
    (schema = { year: { minimum: 2018 } })
-   Least popular song from the album "1989" in August:
    http://localhost:8000/tswizzle?includeKeys=song&maxCount=1&sortKey=plays_august&schema=%7B%22album%22%3A%7B%22const%22%3A%221989%22%7D%7D
    (schema = { album: { const: "1989" } })
-   Songs beginning with the word "The", written in collaberation with others:
    http://localhost:8000/tswizzle?includeKeys=song&includeKeys=writer&schema=%7B%22song%22%3A%7B%22pattern%22%3A%22%5EThe%5C%5Cs.*%22%7D%2C%22writer%22%3A%7B%22not%22%3A%7B%22const%22%3A%22Taylor%20Swift%22%7D%7D%7D
    (schema = { song: { pattern: '^The\s.\*' }, writer: { not: { const: 'Taylor Swift' } } })

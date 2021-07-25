# keplergl-dataset-builder

Created to assist in working with the [kepler.gl](https://github.com/keplergl/kepler.gl) geospacial analysis library.

## Installation

```
npm install --save keplergl-dataset-builder
```

To add the module to you project

## Usage

Import the utility using the javascipt module syntax:

```
import keplerglDatasetBuilder from 'keplergl-dataset-builder';
```

### Basic syntax to call the function

```
keplerglDatasetBuilder([[dataID, dataset],[...]], processorfunction)
```

Contextual example:

```
addDataToMap({
    datasets: keplerglDatasetBuilder(
        [
            ['oitev24ys', file1Data],
            ['o8c48j893', file2Data]
        ],
        processCsvData
    ),
    config
})
```

In this example `file1Data` and `file2Data` are the results of `fetchedCsvFile.text()` and they will processed by the `processCsvData` function as well as having their respective ID strings assigned to them.

The returned array looks like this and can be imported by kepler.gl using its function `addDataToMap`.

```
[
  {
    info: { id: 'oitev24ys' },
    data: { processCsvData(file1Data) }
  },
  {
    info: { id: 'o8c48j893' },
    data: { processCsvData(file2Data) }
  }
]
```

### Function Arguments

#### <b>Raw data array</b>

2 Dimmensional of data to be processed: `[dataID, dataset]`
| dataID | dataset |
| ----------- | ----------- |
| 9 character alphanumeric ID assigned to that dataset. It is nessessary to assign IDs to datasets if a config containing a layer style is also being added to kepler. | As mentioned before, this is the dataset that you want to load. Usually this will be the result of fetching/importing data from an external source and in the case of a csv at least, running a .text() method on it. |

#### <b>Processor function</b>

The kepler.gl library has [built in functions](https://docs.kepler.gl/docs/api-reference/processors/processors) for converting imported data files into a format that kepler can ingest. These include `processCsvData` which is used in the above example.<br>
If nothing is included for the processorFunction argument, whatever was passed in for the dataset will be included in the result unprocessed. This would be desirable is the data is already in a processed format that kepler can handle but has no dataID included.

## Motivation

A small utility for easily building dataset objects to pass into the kepler.gl geospacial analysis library.

For use mainly when fetching data from an remote location such as amazon S3, that needs to be processed before importing into kepler.gl. If you are loading local data that is stored in objects that already contain the data in a processed form including the dataId and title that kepler.gl can easily ingest then there should be no need for this utility.

This utility has only been tested with remotly fetched csv files and that is what the examples will show. There is no gaurantee it will work with json or geojson files. Support for the other forms of data that kepler can accept may come in the future.

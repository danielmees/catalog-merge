import * as Papa from 'papaparse';

export const convertCsvToJson = (csv, callback) => {
  if (!csv) return;

  const papaConfig = {
    header: true,
    complete: (results) => {
      if (results && results.data) {
        callback(results.data);
      }
    },
    download: true,
    error: (error) => {
      console.log('error', error);
    },
  };

  Papa.parse(csv, papaConfig);
};

export const convertJsonToCsvString = (json) =>  {
  if (!json) return;

  return Papa.unparse(json)
};

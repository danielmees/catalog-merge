import React, { useState, useEffect } from 'react';

import { convertCsvToJson } from '../utils/csvConverters';
import { mergeProducts } from '../utils/dataSearchers';

import catalogACsv from '../input/catalogA.csv';
import catalogBCsv from '../input/catalogB.csv';
import barcodesACsv from '../input/barcodesA.csv';
import barcodesBCsv from '../input/barcodesB.csv';

const CatalogMerge = () => {
 const [catalogA, setCatalogA] = useState(null);
 const [catalogB, setCatalogB] = useState(null);
 const [barcodesA, setBarcodesA] = useState(null);
 const [barcodesB, setBarcodesB] = useState(null);

  useEffect(() => {
    convertCsvToJson(catalogACsv, setCatalogA);
    convertCsvToJson(catalogBCsv, setCatalogB);
    convertCsvToJson(barcodesACsv, setBarcodesA);
    convertCsvToJson(barcodesBCsv, setBarcodesB);
  }, []);

  useEffect(() => {
    if (catalogA && catalogB && barcodesA && barcodesB) {
      const mergedCatalog = mergeProducts(catalogA, catalogB, barcodesA, barcodesB);
      console.log('mergedCatalog', mergedCatalog);
    }
  }, [barcodesA, barcodesB, catalogA, catalogB]);
  
  return <></>;
};
    
export default CatalogMerge;
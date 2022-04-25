import React, { useState, useEffect } from 'react';

import { convertCsvToJson } from '../utils/csvHelpers';
import catalogACsv from '../input/catalogA.csv';
import catalogBCsv from '../input/catalogB.csv';
import barcodesACsv from '../input/barcodesA.csv';
import barcodesBCsv from '../input/barcodesB.csv';
import suppliersACsv from '../input/suppliersA.csv';
import suppliersBCsv from '../input/suppliersB.csv';

const CatalogMerge = () => {
 const [catalogA, setCatalogA] = useState(null);
 const [catalogB, setCatalogB] = useState(null);
 const [barcodesA, setBarcodesA] = useState(null);
 const [barcodesB, setBarcodesB] = useState(null);
 const [suppliersA, setSuppliersA] = useState(null);
 const [suppliersB, setSuppliersB] = useState(null);

  useEffect(() => {
    convertCsvToJson(catalogACsv, setCatalogA);
    convertCsvToJson(catalogBCsv, setCatalogB);
    convertCsvToJson(barcodesACsv, setBarcodesA);
    convertCsvToJson(barcodesBCsv, setBarcodesB);
    convertCsvToJson(suppliersACsv, setSuppliersA);
    convertCsvToJson(suppliersBCsv, setSuppliersB);
  }, []);

  useEffect(() => {
    if (catalogA && catalogB && barcodesA && barcodesB && suppliersA && suppliersB) {
      console.log('all data fetch complete');
      console.log('catalogA', catalogA);
      console.log('catalogB', catalogB);
      console.log('barcodesA', barcodesA);
      console.log('barcodesB', barcodesB);
      console.log('suppliersA', suppliersA);
      console.log('suppliersB', suppliersB);
    }
  }, [barcodesA, barcodesB, catalogA, catalogB, suppliersA, suppliersB]);
  
  return <></>;
};
    
export default CatalogMerge;
import React, { useState, useEffect } from 'react';

import Message from './Message';

import { convertCsvToJson, convertJsonToCsvString } from '../utils/csvConverters';
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
 const [message, setMessage] = useState('Merging catalogs, please wait.');
 const [messageType, setMessageType] = useState('');

  useEffect(() => {
    convertCsvToJson(catalogACsv, setCatalogA);
    convertCsvToJson(catalogBCsv, setCatalogB);
    convertCsvToJson(barcodesACsv, setBarcodesA);
    convertCsvToJson(barcodesBCsv, setBarcodesB);
  }, []);

  const sendMergedCatalogToServer = async (mergedCatalogCsvString) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csvData: mergedCatalogCsvString })
    };

    try {
      const response = await fetch(`http://localhost:3000/api/send-catalog`, requestOptions);
      if (response.ok) {
        setMessage('Merge completed! Result saved in src/output folder.');
      } else {
        setMessage('Something went wrong, please refresh the page to try again.');
        setMessageType('warning');
      }
    } catch (_) {} 
  }

  useEffect(() => {
    if (catalogA && catalogB && barcodesA && barcodesB) {
      const mergedCatalog = mergeProducts(catalogA, catalogB, barcodesA, barcodesB);
      if (mergedCatalog.length > 0) {
        const mergedCatalogCsvString = convertJsonToCsvString(mergedCatalog);
        sendMergedCatalogToServer(mergedCatalogCsvString);
      }
    }
  }, [barcodesA, barcodesB, catalogA, catalogB]);
  
  return <div>
    <Message text={message} type={messageType} />
  </div>;
};
    
export default CatalogMerge;
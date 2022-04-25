import React from 'react';

import Button from './components/Button';
import CatalogMerge from './components/CatalogMerge';

import './App.scss';

function App() {
  return (
    <div className='catalog-merge'>
      <Button label='Start merge catalogs' />
      <CatalogMerge />
    </div>
  );
}

export default App;

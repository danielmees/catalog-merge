export const getBarcodes = (sku, barcodes) => {
  if (!sku) return;

  return barcodes.filter(barcode => barcode.SKU === sku)
};

export const getSKUforSameBarcodeProduct = (targetBarcodes, barcodes) => {
  if (!targetBarcodes || targetBarcodes.length === 0) return;

  let sameBarcodeProduct;

  targetBarcodes.every(targetBarcode => {
    sameBarcodeProduct = barcodes.find(barcode => barcode.Barcode === targetBarcode.Barcode);

    if (sameBarcodeProduct) {
      return false;
    }
    
    return true;
  });

  if (!sameBarcodeProduct) return;

  return sameBarcodeProduct.SKU;
}

export const combineDifferentProducts = (catalogA, catalogB) => {
  const combinedProducts = [];
  let catalogACopy = [...catalogA];

  if (catalogB.length > 0) {
      catalogB.forEach(productB => {
        if (productB.SKU) {
          combinedProducts.push({...productB, Source: 'B'});
          const sameDescriptionProductFromA = catalogA.find(productA => productA.Description === productB.Description);
  
          if (sameDescriptionProductFromA) {
            combinedProducts.push({...sameDescriptionProductFromA, Source: 'A'});
            catalogACopy = catalogACopy.filter(product => product.SKU !== sameDescriptionProductFromA.SKU);
          }
        }
    });
  }
  
  if (catalogACopy.length > 0) {
    catalogACopy.forEach(productA => {
      if (productA.SKU) {
        combinedProducts.push({...productA, Source: 'A'})
      }
    });
  }
  
  return combinedProducts;
}


export const mergeProducts = (catalogA, catalogB, barcodesA, barcodesB) => {
  let finalCatalog = [], catalogACopy = [...catalogA], catalogBCopy = [...catalogB];

  catalogB.forEach(productB => {
    if (productB.SKU) {
      const targetBarcodesB = getBarcodes(productB.SKU, barcodesB);
      if (targetBarcodesB && targetBarcodesB.length) {
        const targetSKUFromA = getSKUforSameBarcodeProduct(targetBarcodesB, barcodesA);
        if (targetSKUFromA) {
          const targetProductFromA = catalogA.find(product => product.SKU === targetSKUFromA);
          finalCatalog.push({...targetProductFromA, Source: 'A'});
          catalogACopy = catalogACopy.filter(product => product.SKU !== targetSKUFromA);
          catalogBCopy = catalogBCopy.filter(product => product.SKU !== productB.SKU);
        }
      }
    }
  });

  const combinedDifferentProducts = combineDifferentProducts(catalogACopy, catalogBCopy);

  if (combinedDifferentProducts.length > 0) {
    finalCatalog = finalCatalog.concat(combinedDifferentProducts);
  }

  return finalCatalog;
}

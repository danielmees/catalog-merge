import { getSKUforSameBarcodeProduct, combineDifferentProducts, mergeProducts } from './dataSearchers';
import { mockBarcodesA, mockBarcodesB, mockCatalogA, mockCatalogB } from './mockData';

describe('getSKUforSameBarcodeProduct', () => {
  test('returns undefined if targetBarcodes argument is null or empty array', () => {
    let returnedSKU = getSKUforSameBarcodeProduct(null, mockBarcodesA);
    expect(returnedSKU).toBe(undefined);
    returnedSKU = getSKUforSameBarcodeProduct([], mockBarcodesA);
    expect(returnedSKU).toBe(undefined);
  });

  test('returns correct product SKU if any barcodes match', () => {
    const mockTargetBarcodes = [mockBarcodesB[2], mockBarcodesB[3]];
    const returnedSKU = getSKUforSameBarcodeProduct(mockTargetBarcodes, mockBarcodesA);
    expect(returnedSKU).toBe('280-oad-768');
  });

  test('returns undefined if no match', () => {
    const mockTargetBarcodes = [mockBarcodesB[0], mockBarcodesB[4], mockBarcodesB[5]];
    const returnedSKU = getSKUforSameBarcodeProduct(mockTargetBarcodes, mockBarcodesA);
    expect(returnedSKU).toBe(undefined);
  });
});

describe('combineDifferentProducts', () => {
  test('returns empty if catalogA and B are both empty array', () => {
    const combinedProducts = combineDifferentProducts([], []);
    expect(combinedProducts).toEqual([]);
  });

  test('returns correct products from catalogA and B', () => {
    const mockProductsA = [mockCatalogA[1], mockCatalogA[2]];
    const mockProductsB = [mockCatalogB[1], mockCatalogB[2]];
    const expectProducts = [{...mockCatalogB[1], Source: 'B'}, {...mockCatalogB[2], Source: 'B'}, 
    {...mockCatalogA[2], Source: 'A'}, {...mockCatalogA[1], Source: 'A'}];
    const combinedProducts = combineDifferentProducts(mockProductsA, mockProductsB);
    expect(combinedProducts).toStrictEqual(expectProducts);
  });
});

describe('mergeProducts', () => {
  test('returns correct merged catalog from catalogA and B', () => {
    const expectProducts = [{...mockCatalogA[0], Source: 'A'}, {...mockCatalogA[1], Source: 'A'},
    {...mockCatalogB[2], Source: 'B'}, {...mockCatalogA[2], Source: 'A'}];
    const mergedCatalog = mergeProducts(mockCatalogA, mockCatalogB, mockBarcodesA, mockBarcodesB);
    expect(mergedCatalog).toStrictEqual(expectProducts);
  });
});



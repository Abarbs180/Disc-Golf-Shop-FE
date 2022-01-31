import { useMemo } from "react";

const useFilter = (products, productsFilter, brandsFilter, typesFilter) => {
  return useMemo(() => {
    let filteredProducts = [...products];

    if (productsFilter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name === productsFilter ||
          product.brand === productsFilter ||
          product.type === productsFilter
      );
    }

    if (brandsFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => String(product.brand_id) === brandsFilter
      );
    }

    if (typesFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => String(product.type_id) === typesFilter
      );
    }

    return filteredProducts;
  }, [products, productsFilter, brandsFilter, typesFilter]);
};

export default useFilter;

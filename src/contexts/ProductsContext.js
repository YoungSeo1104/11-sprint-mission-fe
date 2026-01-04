import { createContext, useContext } from 'react';

const defaultContextValue = {
  data: [],
  bestList: [],
  listParams: {
    page: 1,
    pageSize: 10,
    keyword: '',
    orderBy: 'recent',
  },
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  setListParams: () => console.warn('setListParams not implemented'),
  goToPage: () => console.warn('goToPage not implemented'),
};

const ProductsContext = createContext(defaultContextValue);

export default ProductsContext;

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

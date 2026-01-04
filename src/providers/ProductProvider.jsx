/*
 * 판다마켓 - 상품 페이지
 */

import { useEffect, useState } from 'react';
import { ProductService } from '@/api/api';
import ProductsContext from '@/contexts/ProductsContext';
import { usePagination } from '@/hooks/usePagination';

const POSTS_PER_PAGE = 12;
const INITIAL_PAGE = 1;

const ProductProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    currentPage,
    totalPages,
    // setTotalItems,
    goToPage,
    // setCurrentPage
  } = usePagination(INITIAL_PAGE, POSTS_PER_PAGE);

  const getPageSize = () => {
    if (window.innerWidth > 1199) return 10;
    if (window.innerWidth > 768) return 6;
    return 4;
  };

  const getFavoritePageSize = () => {
    if (window.innerWidth > 1199) return 4;
    if (window.innerWidth > 768) return 2;
    return 1;
  };
  const [listParams, setListParams] = useState({
    page: 1,
    pageSize: getPageSize(),
    keyword: '',
    orderBy: 'recent',
  });
  const [data, setData] = useState([]);
  const [bestParams, setBestParams] = useState({
    pageSize: getFavoritePageSize(),
    orderBy: 'favorite',
  });
  const [bestList, setBestList] = useState([]);

  //판매중인 상품 api
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await ProductService.getProductList(listParams);
        setData(res.list);
        // setTotalItems(res.totalCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [listParams]);

  //베스트 상품 api
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await ProductService.getProductList(bestParams);
        setBestList(res.list);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [bestParams]);

  useEffect(() => {
    let timer;
    let prevPageSize = getPageSize(); // 초기값 저장

    const handleResize = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        const newPageSize = getPageSize();

        if (newPageSize !== prevPageSize) {
          prevPageSize = newPageSize;

          setListParams((prev) => ({
            ...prev,
            pageSize: newPageSize,
            page: 1,
          }));

          setBestParams((prev) => ({
            ...prev,
            pageSize: getFavoritePageSize(),
          }));
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contextValue = {
    data,
    bestList,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToPage,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductProvider;

/*
 * 판다마켓 - 상품 페이지
 */

import { useEffect, useState } from 'react';
import { ProductService } from '@/api/api';
import styles from './products.module.css';
import errorImg from '@/assets/images/error.png';
import ProductsContext from '@/contexts/ProductsContext';
// import { Pagination } from '@/components/Pagination';
// import { Spinner } from '@/components/Spinner';
// import { usePagination } from '@/hooks/usePagination';

const Products = () => {
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
    const fetch = async () => {
      const res = await ProductService.getProductList(listParams);
      setData(res);
    };
    fetch();
  }, [listParams]);

  //베스트 상품 api
  useEffect(() => {
    const fetch = async () => {
      const res = await ProductService.getProductList(bestParams);
      setBestList(res.list);
    };
    fetch();
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

  return (
    <div className={styles.contents}>
      <section className={styles.best}>
        <h2>베스트 상품</h2>
        <div className={styles.items}>
          {bestList &&
            bestList.map((item) => {
              return (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.images[0] || errorImg}
                    alt={item.name}
                    onError={(e) => (e.target.src = errorImg)}
                  />
                  <h4>{item.name}</h4>
                  <h5>{item.price}원</h5>
                  <p>
                    <i />
                    <span>240</span>
                  </p>
                </div>
              );
            })}
        </div>
      </section>
      <section className={styles.product}>
        <article>
          <h2>판매 중인 상품</h2>
          <form>
            <input type="text" placeholder="검색할 상품을 입력해주세요" />
            <button>상품 등록하기</button>
            <select
              name="type"
              id="list-type"
              value={listParams.orderBy}
              onChange={(e) =>
                setListParams((prev) => ({
                  ...prev,
                  orderBy: e.target.value,
                }))
              }
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </form>
        </article>
        <ProductsContext.contents>
          <div className={styles.items + ' ' + styles.productItems}>
            {data.list &&
              data.list.map((item) => {
                return (
                  <div key={item.id} className={styles.item}>
                    <img
                      src={item.images[0] || errorImg}
                      alt={item.name}
                      onError={(e) => (e.target.src = errorImg)}
                    />
                    <h4>{item.name}</h4>
                    <h5>{item.price}원</h5>
                    <p>
                      <i />
                      <span>240</span>
                    </p>
                  </div>
                );
              })}
          </div>
        </ProductsContext.contents>
      </section>
    </div>
  );
};

export default Products;

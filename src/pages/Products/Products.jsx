/*
 * 판다마켓 - 상품 페이지
 */
import styles from './products.module.css';
import errorImg from '@/assets/images/error.png';
import { useProductsContext } from '@/contexts/ProductsContext';
import Spinner from '@/components/Spinner/Spinner';
import Pagination from '@/components/Pagination/Pagination';

const Products = () => {
  const {
    isLoading,
    error,
    data,
    bestList,
    listParams,
    setListParams,
    currentPage,
    totalPages,
    goToPage,
  } = useProductsContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

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
        <div className={styles.items + ' ' + styles.productItems}>
          {data &&
            data.map((item) => {
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage} // Pass goToPage as onPageChange
      />
    </div>
  );
};

export default Products;

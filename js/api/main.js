//ArticleService, ProductService 호출 확인용
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './ArticleService.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './ProductService.js';

const articleAPI = async () => {
  console.log(
    'getArticleList:',
    await getArticleList({
      page: 1,
      pageSize: 10,
      keyword: '',
    })
  );
  console.log('getArticle:', await getArticle(5419));
  console.log(
    'createArticle:',
    await createArticle({
      title: 'createArticle 호출.',
      content: '게시글 내용입니다.',
      image: 'https://example.com/...',
    })
  );
  console.log(
    'patchArticle:',
    await patchArticle(5419, {
      title: 'patchArticle 호출.',
      content: '5419 수정테스트',
      image: 'https://example.com/...',
    })
  );
  console.log('deleteArticle:', await deleteArticle(5418));
};

const productAPI = async () => {
  console.log(
    'getProductList:',
    await getProductList({
      page: 1,
      pageSize: 10,
      keyword: '',
    })
  );
  console.log('getProduct:', await getProduct(2900));
  console.log(
    'createProduct:',
    await createProduct({
      images: ['https://example.com/...'],
      tags: ['전자제품'],
      price: 0,
      description: 'createProduct 호출',
      name: '노트북',
    })
  );
  console.log(
    'patchProduct:',
    await patchProduct(2900, {
      images: ['https://example.com/...'],
      tags: ['전자제품'],
      price: 0,
      description: 'patchProduct 호출',
      name: 'TV',
    })
  );
  console.log('deleteProduct:', await deleteProduct(2899));
};

articleAPI();
productAPI();

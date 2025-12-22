//Article API
//axios, .then(), .catch() 사용

import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/',
  timeout: 3000,
});

export const getArticleList = (params) => {
  return instance
    .get(`/articles`, { params })
    .then((res) => res.data)
    .catch((error) => {
      console.log(
        'getArticleList Error:',
        error.response?.data || error.message
      );
    });
};

export const getArticle = (id) => {
  return instance
    .get(`/articles/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log('getArticle Error:', error.response?.data || error.message);
    });
};

export const createArticle = ({ title, content, image }) => {
  return instance
    .post(`/articles`, { title, content, image })
    .then((res) => res.data)
    .catch((error) => {
      console.log(
        'createArticle Error:',
        error.response?.data || error.message
      );
    });
};

export const patchArticle = (id, data) => {
  return instance
    .patch(`/articles/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.log('patchArticle Error:', error.response?.data || error.message);
    });
};

export const deleteArticle = (id) => {
  return instance
    .delete(`/articles/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(
        'deleteArticle Error:',
        error.response?.data || error.message
      );
    });
};

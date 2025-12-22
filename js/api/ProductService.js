//Product API
//fetch 사용, try/catch문 활용
const PRODUCT_URL = 'https://panda-market-api-crud.vercel.app/products';

export const getProductList = async (params = {}) => {
  try {
    const url = new URL(`${PRODUCT_URL}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, value);
      }
    });

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.log('getProductList Error:', error.message);
  }
};

export const getProduct = async (id) => {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.log('getProduct Error:', error.message);
  }
};

export const createProduct = async ({
  name,
  description,
  price,
  tags,
  images,
}) => {
  try {
    const res = await fetch(`${PRODUCT_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    console.log('createProduct Error:', error.message);
  }
};

export const patchProduct = async (id, params) => {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.log('patchProduct Error:', error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.log('deleteProduct Error:', error.message);
  }
};

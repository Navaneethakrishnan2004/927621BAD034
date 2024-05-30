const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const ecomApis = [
  'https://fakestoreapi.com/products',
  'https://dummyjson.com/products'
];

app.use(express.json());

app.get('/categories/:category/products', async (req, res) => {
  const { category } = req.params;
  const { n = 10, page = 1, sort_by, order = 'asc', min_price, max_price } = req.query;

  try {
    let allProducts = [];
    for (const api of ecomApis) {
      const response = await axios.get(api);
      const products = response.data.products.map(product => ({
        ...product,
        id: uuidv4() 
      }));
      allProducts = allProducts.concat(products);
    }

    allProducts = allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());

    if (min_price) {
      allProducts = allProducts.filter(product => product.price >= min_price);
    }
    if (max_price) {
      allProducts = allProducts.filter(product => product.price <= max_price);
    }

    if (sort_by) {
      allProducts.sort((a, b) => {
        if (order === 'asc') {
          return a[sort_by] > b[sort_by] ? 1 : -1;
        } else {
          return a[sort_by] < b[sort_by] ? 1 : -1;
        }
      });
    }
    const start = (page - 1) * n;
    const paginatedProducts = allProducts.slice(start, start + n);

    res.json(paginatedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/categories/:category/products/:productid', async (req, res) => {
  const { category, productid } = req.params;

  try {
    let productDetails = null;
    for (const api of ecomApis) {
      const response = await axios.get(api);
      const product = response.data.products.find(product => product.id === productid);
      if (product) {
        productDetails = product;
        break;
      }
    }

    if (productDetails) {
      res.json(productDetails);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Container, Grid, Typography, Select, MenuItem } from '@material-ui/core';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, [category, sortCriteria, sortBy, page, pageSize]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/categories/${category}/products`, {
        params: { n: pageSize, page, sort_by: sortBy }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select value={category} onChange={handleCategoryChange}>
            <MenuItem value="">All Categories</MenuItem>
            {/* Add options for categories */}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select value={sortCriteria} onChange={handleSortCriteriaChange}>
            <MenuItem value="">Sort By</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            {/* Add more sorting options */}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select value={sortBy} onChange={handleSortByChange}>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select value={pageSize} onChange={handlePageSizeChange}>
            <MenuItem value={10}>10 per page</MenuItem>
            <MenuItem value={20}>20 per page</MenuItem>
            <MenuItem value={50}>50 per page</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllProductsPage;

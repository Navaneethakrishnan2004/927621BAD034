import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('Phone');
  const [page, setPage] = useState(1);
  const [n, setN] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, [category, page, n]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/categories/${category}/products`, {
        params: { page, n }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Top Products</h1>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="Phone">Phone</option>
          <option value="Computer">Computer</option>
          <option value="TV">TV</option>
          {/* Add other categories here */}
        </select>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </header>
      <main>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Company: {product.company}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}%</p>
              <p>Availability: {product.availability}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;

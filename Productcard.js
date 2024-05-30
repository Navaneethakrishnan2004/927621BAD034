import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Company: {product.company}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Rating: {product.rating}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Discount: {product.discount}%
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Availability: {product.availability}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

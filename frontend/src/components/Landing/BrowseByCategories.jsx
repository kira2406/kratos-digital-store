import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, Typography, Box } from '@mui/material';

const categories = [
  'Strategy', 'Action', 'Adventure',
  'RPG', 'Indie', 'Simulation', 'Casual', 'Early Access'
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3, // Show 3 cards at once
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const BrowseByCategories = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', margin: 2 }}>
        BROWSE BY CATEGORIES
      </Typography>

      <Carousel
        responsive={responsive}
        ssr
        infinite
        keyBoardControl
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        arrows
        autoPlay={false}
      >
        {categories.map((category, index) => (
          <Card
            key={index}
            sx={{
              height: 100,
              margin: 2,
              backgroundImage: 'linear-gradient(345deg,rgb(3, 64, 120) 25%,#2a5298 70%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              borderRadius: 3,
              boxShadow: 10,
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                {category}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default BrowseByCategories;

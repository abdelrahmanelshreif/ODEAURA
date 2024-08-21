import React, { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import axios from 'axios';
import axiosClient from '../../../api/axiosClient';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosClient.get('/reviews'); // Replace with your API endpoint
        setReviews(response.data.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#ff6f00' : '#ddd' }}>★</span>
      );
    }
    return stars;
  };

  return (
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
      slideGap="md"
      align="start"
      slidesToScroll={1}
      loop
      // withIndicators
    >
      {reviews.map((review) => (
        <Carousel.Slide key={review._id}>
          <div style={styles.reviewBox}>
            <Image
              src={review.user.photo}
              alt={`${review.user.firstName} ${review.user.lastName}`}
              width={50}
              height={50}
              radius="xl"
              mb="sm"
            />
            <p style={styles.reviewerName}>
              {`${review.user.firstName} ${review.user.lastName}`}
            </p>
            <div style={styles.stars}>{renderStars(review.rating)}</div>
            <p style={styles.reviewText}>&quot;{review.review}&quot;</p>
          </div>
        </Carousel.Slide>
      ))}
      <br />
      <br />
    </Carousel>
  );
};

const styles = {
  reviewBox: {
    margin: '10px',
    padding: '20px',
    border: '2px solid #ddd',
    borderRadius: '20px',
    textAlign: 'center',
  },
  reviewerName: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  reviewText: {
    fontStyle: 'italic',
    margin: '10px 0',
  },
  stars: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default Reviews;

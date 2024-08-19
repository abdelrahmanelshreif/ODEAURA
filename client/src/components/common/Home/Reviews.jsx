import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      text: 'صراحة الثابت ما شاءالله',
      name: ' محمد منصور',
      rating: 5,
      // location: 'الرياض'
    },
    {
      text: 'جميل',
      name: 'بدر رامي',
      rating: 4,
      // location: 'الرياض'
    },  
  ];

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
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Reviews</h2>
      <div style={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <div key={index} style={styles.reviewBox}>
            <p style={styles.reviewText}>&quot;{review.text}&quot;</p>
            <div style={styles.reviewFooter}>
              <div style={styles.stars}>{renderStars(review.rating)}</div>
              <div style={styles.reviewerInfo}>
                <span>{review.name}</span>
                <span>{review.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    color: '#ff6f00',
    marginBottom: '20px',
  },
  reviewsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  reviewBox: {
    margin: '10px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    flex: '1 1 calc(45% - 40px)',
    boxSizing: 'border-box',
    minWidth: '280px',
  },
  reviewText: {
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  reviewFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stars: {
    display: 'flex',
  },
  reviewerInfo: {
    textAlign: 'right',
  },
  '@media (max-width: 768px)': {
    reviewBox: {
      flex: '1 1 calc(100% - 40px)',
    },
  },
};

export default Reviews;

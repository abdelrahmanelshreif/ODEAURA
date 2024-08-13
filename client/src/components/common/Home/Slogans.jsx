import React from 'react';

const Slogans = () => {
  const slogans = [
    {
      icon: '🚚', // You can replace this with an appropriate icon or image
      title: 'Fast and safe shipping!',
      description: 'We ship to all cities in Egypt'
    },
    {
      icon: '🔔', // You can replace this with an appropriate icon or image
      title: 'We respond with lightning speed!',
      description: 'Always Here..ready 24/7!'
    },
    {
      icon: '💰', // You can replace this with an appropriate icon or image
      title: 'What are the payment methods?',
      description: 'Receive the first and pay comfortably, confident in our products.'
    }
  ];

  return (
    <div style={styles.container}>
      {slogans.map((slogan, index) => (
        <div key={index} style={styles.sloganBox}>
          <div style={styles.icon}>{slogan.icon}</div>
          <h2 style={styles.title}>{slogan.title}</h2>
          <p style={styles.description}>{slogan.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: '20px',
  },
  sloganBox: {
    margin: '10px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    flex: '1 1 calc(33% - 40px)',
    boxSizing: 'border-box',
    minWidth: '280px',
  },
  icon: {
    fontSize: '50px',
    marginBottom: '10px',
  },
  title: {
    color: '#ff6f00',
    marginBottom: '10px',
  },
  description: {
    color: '#555',
  },
  '@media (max-width: 768px)': {
    sloganBox: {
      flex: '1 1 calc(50% - 40px)',
    },
  },
  '@media (max-width: 480px)': {
    sloganBox: {
      flex: '1 1 calc(100% - 40px)',
    },
  },
};

export default Slogans;

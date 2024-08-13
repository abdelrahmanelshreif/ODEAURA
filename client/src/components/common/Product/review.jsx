import React, { useState } from 'react';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saveDetails, setSaveDetails] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ rating, review, name, email, saveDetails });
  };

  return (
    <div className="review-form-container">
      <h2>You Can put your review here</h2>
      <p>Your email address will not be published. Required fields are marked <span style={{color: 'red'}}>*</span></p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your rating <span style={{color: 'red'}}>*</span>:</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((rate) => (
              <span
                key={rate}
                className={`star ${rate <= rating ? 'selected' : ''}`}
                onClick={() => handleRating(rate)}
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Your review <span style={{color: 'red'}}>*</span>:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            rows="5"
            className="form-control"
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              backgroundColor: '#fffbff', // Set the background to white
              color: '#000000',           // Set the text color to black
              border: '1px solid #ccc',   // Optional: Add a border for better visibility
                }}
                  />
                  </div>

        <div className="form-group">
          <label>Email <span style={{color: 'red'}}>*</span></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={saveDetails}
              onChange={() => setSaveDetails(!saveDetails)}
            />
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};



export default ReviewForm;

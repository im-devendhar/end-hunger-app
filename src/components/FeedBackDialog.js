
// src/FeedbackDialog.js
import React, { useState } from 'react';

const FeedbackDialog = ({ food, onClose }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Submitted Feedback:', { food, rating, feedback });
        onClose(); // Close the dialog after submission
    };

    return (
        <div className="dialog-overlay">
            <div className="dialog-content">
                <h2>Feedback for {food.food_name}</h2>
                <div className="star-rating">
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            className={`star ${rating > index ? 'filled' : ''}`}
                            onClick={() => setRating(index + 1)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    placeholder="Leave your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="dialog-actions">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackDialog;

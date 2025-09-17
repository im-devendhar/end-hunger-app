
// src/FoodTable.js
import React, { useState } from 'react';
import FeedbackDialog from './FeedBackDialog';

const FoodTable = ({ foodList, isRecipient }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    // const data = {
    //     "food_list": [
    //         {
    //             "donor_phone": "1234567890",
    //             "food_location": "Downtown",
    //             "food_name": "Bread and Vegetables",
    //             "is_donating": true
    //         },
    //         {
    //             "donor_phone": "0987654321",
    //             "food_location": "Uptown",
    //             "food_name": "Fruits",
    //             "is_donating": false
    //         }
    //     ]
    // };
    const handleFeedbackOpen = (food) => {
        setSelectedFood(food);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedFood(null);
    };

    return (
        <>
            <table className="food-table">
                <thead>
                    <tr>
                        <th> Phone</th>
                        <th>Food Location</th>
                        <th>Food Name</th>
                        {!isRecipient && <th>Feedback</th>}
                    </tr>
                </thead>
                <tbody>
                    {console.log("foodList",foodList?.data?.food_list)
                    }
                    {foodList?.data?.food_list?.map((food, index) => (
                            <tr key={index}>
                                {isRecipient ? <td>{food.recipient_phone}</td>: <td>{food.donor_phone}</td>}
                                <td>{food.food_location}</td>
                                <td>{food.food_name}</td>
                                {!isRecipient && (
                                    <td>
                                        <button onClick={() => handleFeedbackOpen(food)}>Feedback</button>
                                    </td>
                                )}
                            </tr>
                    ))}
                </tbody>
            </table>
            {openDialog && (
                <FeedbackDialog food={selectedFood} onClose={handleCloseDialog} />
            )}
        </>
    );
};

export default FoodTable;
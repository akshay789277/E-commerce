import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Import useParams from react-router-dom

const DeleteProduct = () => {
    const { id } = useParams();  // Use useParams to get URL parameters
    const navigate = useNavigate();  // Use useNavigate hook to navigate programmatically

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/product/${id}`)
            .then(response => {
                console.log(response.data);
                // Optionally add navigation or other actions after successful deletion
                navigate('/');  // Example: Navigate to home page after deletion
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Delete Product</h2>
            <button onClick={handleDelete}>Delete Product</button>
        </div>
    );
};

export default DeleteProduct;

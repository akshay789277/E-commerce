import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const { id } = useParams(); // Access the id parameter from the URL
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: ''
    });
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        // Fetch product details based on the id parameter
        fetchProduct(id);
    }, [id]);

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:5000/product/${productId}`);
            const { name, price, description } = response.data; // Assuming backend returns product data
            setProduct({ name, price, description });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/product/${id}`, product)
            .then(response => {
                console.log(response.data);
                setUpdateMessage('Product updated successfully'); // Set success message
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Update Product</h2>
            {updateMessage && <p>{updateMessage}</p>} {/* Conditional rendering of update message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={product.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;

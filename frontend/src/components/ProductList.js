import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css'; // Import CSS file for component-specific styles

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                console.log(response.data); // Check API response in console
                // Transform the response data to match expected structure
                const transformedProducts = response.data.map(product => ({
                    id: product[0],
                    name: product[1],
                    price: parseFloat(product[2]).toFixed(2) // Parse price as float with 2 decimal places
                }));
                setProducts(transformedProducts); // Update products state
            })
            .catch(error => {
                console.log('Error fetching products:', error); // Log any errors
            });
    }, []);

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            {products.length === 0 ? (
                <p>Loading products...</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;

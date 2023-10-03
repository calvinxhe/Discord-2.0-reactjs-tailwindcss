import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';

function ShoppingCart() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [userRole, setUserRole] = useState('user');

    useEffect(() => {
        fetchProducts();
        fetchUserRole();
    }, []);

    const fetchUserRole = () => {
        db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
            if (doc.exists) {
                setUserRole(doc.data().role);
            }
        });
    };

    const fetchProducts = () => {
        db.collection('shoppingCart').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        });
    };

    const validateUserRole = () => {
        if (userRole !== 'admin' && userRole !== 'owner') {
            alert('You do not have permission to perform this action.');
            return false;
        }
        return true;
    };

    const addProduct = () => {
        if (!validateUserRole()) return;

        db.collection('shoppingCart').add({
            name: productName,
            price: productPrice
        }).then(fetchProducts);
    };

    const editProduct = (id) => {
        if (!validateUserRole()) return;

        const newName = prompt('Enter new product name:', productName);
        const newPrice = prompt('Enter new product price:', productPrice);

        if (newName && newPrice) {
            db.collection('shoppingCart').doc(id).update({
                name: newName,
                price: newPrice
            }).then(fetchProducts);
        }
    };

    const deleteProduct = (id) => {
        if (!validateUserRole()) return;

        db.collection('shoppingCart').doc(id).delete().then(fetchProducts);
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            <div>
                <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Product Name" />
                <input value={productPrice} onChange={e => setProductPrice(e.target.value)} placeholder="Product Price" />
                <button onClick={addProduct}>Add Product</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product.id} style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '200px' }}>
                        <h3>{product.data.name}</h3>
                        <p>${product.data.price}</p>
                        <button onClick={() => editProduct(product.id)}>Edit</button>
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
    );
}

export default ShoppingCart;

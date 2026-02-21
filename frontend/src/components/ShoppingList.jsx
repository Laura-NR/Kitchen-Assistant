import React from 'react';

export default function ShoppingList() {
    return (
        <div className="container mt-4">
            <h2>Shopping List</h2>
            <p>Items you need to buy.</p>

            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                    Milk
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                    Eggs
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                    Bread
                </li>
            </ul>

            <button className="btn btn-primary mt-3">Add Item</button>
        </div>
    );
}

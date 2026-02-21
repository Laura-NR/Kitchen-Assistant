import React, { useState, useEffect } from 'react';
import { fetchTips, addTip } from './API/zerowaste-api';

export default function ZeroWasteModule() {
    const [searchTerm, setSearchTerm] = useState('');
    const [tips, setTips] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTip, setNewTip] = useState({ keyword: '', suggestion: '', category: 'Food' });
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('jwt');
        const results = await fetchTips(token, searchTerm);
        setTips(results);
        setLoading(false);
    };

    const handleAddTip = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        await addTip(token, {
            keyword: newTip.keyword,
            suggestion: newTip.suggestion,
            category: newTip.category
        });
        alert('Tip added successfully!');
        setShowAddForm(false);
        setNewTip({ keyword: '', suggestion: '', category: 'Food' });
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Zero Waste</h1>
                <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Close Form' : 'Contribute Tip'}
                </button>
            </div>

            <p>Discover tips to reduce waste and recycle efficiently.</p>

            {showAddForm && (
                <div className="card mb-4 p-3 border-primary">
                    <h4>Add a Zero Waste Tip</h4>
                    <form onSubmit={handleAddTip}>
                        <div className="mb-3">
                            <label className="form-label">Ingredient / Item</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Banana Peel"
                                value={newTip.keyword}
                                onChange={(e) => setNewTip({ ...newTip, keyword: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Suggestion</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="How can it be reused?"
                                value={newTip.suggestion}
                                onChange={(e) => setNewTip({ ...newTip, suggestion: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={newTip.category}
                                onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}
                            >
                                <option value="Food">Food</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Garden">Garden</option>
                                <option value="Crafts">Crafts</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Submit Tip</button>
                    </form>
                </div>
            )}

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSearch} className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="I have leftover..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </form>
                </div>
            </div>

            {loading ? (
                <p>Searching...</p>
            ) : (
                <div className="row">
                    {tips.length > 0 ? (
                        tips.map(tip => (
                            <div key={tip.id} className="col-md-6 mb-3">
                                <div className="card h-100">
                                    <div className="card-header bg-transparent">
                                        {tip.ingredient_keyword} <span className="badge bg-secondary float-end">{tip.category}</span>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{tip.suggestion}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        searchTerm && <p>No tips found. Try a different keyword or ask our AI (Coming Soon!).</p>
                    )}
                </div>
            )}

            {!searchTerm && tips.length === 0 && (
                <div className="card mt-4 bg-light">
                    <div className="card-header">
                        Tip of the Day
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>Don't throw away vegetable scraps! Use them to make a delicious vegetable stock.</p>
                        </blockquote>
                    </div>
                </div>
            )}
        </div>
    );
}

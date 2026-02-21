import React, { useState, useEffect } from 'react';

export default function MenuPlanner() {
    const [viewMode, setViewMode] = useState('week'); // 'month', 'week', 'day'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [menuItems, setMenuItems] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null); // { day: 'YYYY-MM-DD', type: 'lunch' }

    // Fetch recipes for the picker
    useEffect(() => {
        const fetchRecipes = async () => {
            const token = localStorage.getItem('jwt');
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching recipes", err);
            }
        };
        fetchRecipes();
    }, []);

    // Fetch menus/items
    useEffect(() => {
        loadMenus();
    }, [currentDate]); // Reload when date changes (scrolling weeks)

    const loadMenus = async () => {
        const token = localStorage.getItem('jwt');
        try {
            // For simplicity, fetching ALL menus for now. 
            // Ideally we fetch by range, but backend endpoint `GET /menus` lists all.
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/kitchen/menus`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const menus = await res.json();

            // Flatten items from all menus? 
            // Actually `listMenus` returns menus WITHOUT items joined (usually). 
            // We need to fetch details for relevant menus.
            // Let's assume we find the menu for the current week and fetch its details.

            if (menus && menus.length > 0) {
                // Sort DESC
                const latestMenu = menus[0]; // Simplified: taking the first one
                const detailRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/kitchen/menus/${latestMenu.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const fullMenu = await detailRes.json();
                setMenuItems(fullMenu.items || []);
                // Store currentMenuId if needed for adding items
                window.currentMenuId = latestMenu.id;
            } else {
                // If no menu exists, we might need to create one.
                // For this prototype, let's assume one exists or prompt user to create.
                setMenuItems([]);
            }

        } catch (err) {
            console.error("Error loading menus", err);
        }
    };

    const handleAddClick = (day, type) => {
        if (!window.currentMenuId) {
            alert("No active menu found. Please create a menu first (Backend needs auto-create logic).");
            return;
        }
        setSelectedSlot({ day, type });
        setShowAddModal(true);
    };

    const handleRecipeSelect = async (recipeId) => {
        const token = localStorage.getItem('jwt');
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/kitchen/menus/${window.currentMenuId}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    recipeId: recipeId,
                    day: selectedSlot.day, // This needs to be consistent with 'Monday' etc or Date?
                    // Schema uses 'day_of_week' VARCHAR(20). So 'Monday', 'Tuesday' is fine.
                    type: selectedSlot.type
                })
            });
            setShowAddModal(false);
            loadMenus();
        } catch (err) {
            console.error("Error adding item", err);
        }
    };

    const handleRemoveItem = async (itemId, e) => {
        e.stopPropagation();
        const token = localStorage.getItem('jwt');
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/kitchen/menus/items/${itemId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            loadMenus();
        } catch (err) {
            console.error("Error removing item", err);
        }
    };

    // Helper to filter items
    const getItemsForSlot = (day, type) => {
        return menuItems.filter(i => i.day_of_week === day && i.meal_type === type);
    };

    // Render Helpers
    const renderCard = (item) => (
        <div key={item.id} className="card mb-1 p-1 shadow-sm border" style={{ fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => alert(`Open Recipe ${item.recipe_title}`)}>
            <div className="d-flex align-items-center">
                {item.recipe_image && <img src={item.recipe_image} alt="" style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', marginRight: '5px' }} />}
                <div className="text-truncate" style={{ maxWidth: '80px' }}>{item.recipe_title}</div>
                <button className="btn btn-link text-danger p-0 ms-auto" style={{ fontSize: '0.8rem', lineHeight: 1 }} onClick={(e) => handleRemoveItem(item.id, e)}>&times;</button>
            </div>
        </div>
    );

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Menu Planner</h2>
                <div className="btn-group">
                    <button className={`btn btn-outline-primary ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}>Month</button>
                    <button className={`btn btn-outline-primary ${viewMode === 'week' ? 'active' : ''}`} onClick={() => setViewMode('week')}>Week</button>
                    <button className={`btn btn-outline-primary ${viewMode === 'day' ? 'active' : ''}`} onClick={() => setViewMode('day')}>Day</button>
                </div>
            </div>

            {viewMode === 'week' && (
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="bg-light">
                            <tr>
                                <th style={{ width: '100px' }}>Meal</th>
                                {days.map(d => <th key={d}>{d}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map(meal => (
                                <tr key={meal}>
                                    <td className="fw-bold align-middle bg-light">{meal}</td>
                                    {days.map(day => (
                                        <td key={`${day}-${meal}`} style={{ minWidth: '150px', height: '100px', verticalAlign: 'top' }}>
                                            {getItemsForSlot(day, meal).map(renderCard)}
                                            <button className="btn btn-sm btn-light w-100 mt-1 text-muted" onClick={() => handleAddClick(day, meal)}>+</button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {viewMode === 'month' && (
                <div className="alert alert-warning">Monthly View implementation simplified for this demo (requires generic calendar logic). Switching to Week view recommended.</div>
            )}
            {viewMode === 'day' && (
                <div className="alert alert-warning">Day View implementation coming soon.</div>
            )}

            {/* Simple Recipe Picker Modal (Overlay) */}
            {showAddModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Recipe for {selectedSlot?.day} - {selectedSlot?.type}</h5>
                                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="list-group">
                                    {recipes.map(r => (
                                        <button key={r.id} className="list-group-item list-group-item-action" onClick={() => handleRecipeSelect(r.id)}>
                                            {r.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

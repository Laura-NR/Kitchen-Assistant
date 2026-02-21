import React, { useState, useEffect } from 'react';
import { fetchMyPlants, fetchPlants, addMyPlant, waterPlant } from './API/garden-api';

export default function GardenModule() {
    const [myPlants, setMyPlants] = useState([]);
    const [allPlants, setAllPlants] = useState([]); // Master list for dropdown
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPlantData, setNewPlantData] = useState({ plantId: '', nickname: '', location: 'Balcony' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const token = localStorage.getItem('jwt');
        const plantsData = await fetchMyPlants(token);
        setMyPlants(plantsData);

        // Load master list only if needed (e.g. when opening add form, or lazy load)
        // For now load here
        const masterData = await fetchPlants(token);
        setAllPlants(masterData);
        setLoading(false);
    };

    const handleWater = async (id) => {
        const token = localStorage.getItem('jwt');
        await waterPlant(token, id);
        loadData(); // Refresh to update last watered time
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleAddPlant = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');

        const formData = new FormData();
        formData.append('plantId', newPlantData.plantId);
        formData.append('nickname', newPlantData.nickname);
        formData.append('location', newPlantData.location);
        formData.append('plantedAt', new Date().toISOString().split('T')[0]);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        await addMyPlant(token, formData);

        setShowAddForm(false);
        setNewPlantData({ plantId: '', nickname: '', location: 'Balcony' });
        setSelectedImage(null);
        loadData();
    };

    if (loading) return <div>Loading Garden...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>My Garden</h1>
                <button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Cancel' : 'Add Plant'}
                </button>
            </div>

            {showAddForm && (
                <div className="card mb-4 p-3">
                    <h3>Add New Plant</h3>
                    <form onSubmit={handleAddPlant}>
                        <div className="mb-3">
                            <label className="form-label">Plant Type</label>
                            <select
                                className="form-select"
                                value={newPlantData.plantId}
                                onChange={(e) => setNewPlantData({ ...newPlantData, plantId: e.target.value })}
                                required
                            >
                                <option value="">Select a plant...</option>
                                {allPlants.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.variety})</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nickname (Optional)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newPlantData.nickname}
                                onChange={(e) => setNewPlantData({ ...newPlantData, nickname: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Plant Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                accept="image/*"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <select
                                className="form-select"
                                value={newPlantData.location}
                                onChange={(e) => setNewPlantData({ ...newPlantData, location: e.target.value })}
                            >
                                <option value="Balcony">Balcony</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Living Room">Living Room</option>
                                <option value="Garden">Garden</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Plant</button>
                    </form>
                </div>
            )}

            {myPlants.length === 0 ? (
                <p>No plants in your garden yet. Add one!</p>
            ) : (
                <div className="row">
                    {myPlants.map(plant => (
                        <div key={plant.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{plant.nickname || plant.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{plant.variety}</h6>
                                    <p className="card-text">
                                        Location: {plant.location}<br />
                                        Water every {plant.watering_frequency_days} days<br />
                                        Last Watered: {plant.last_watered_at ? new Date(plant.last_watered_at).toLocaleDateString() : 'Never'}
                                    </p>
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleWater(plant.id)}>
                                        Mark as Watered
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

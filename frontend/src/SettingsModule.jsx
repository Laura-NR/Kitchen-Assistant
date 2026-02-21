import React from 'react';

export default function SettingsModule() {
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Settings</h1>

            <div className="bg-white p-4 mb-4 rounded shadow-sm border">
                <h4 className="border-bottom pb-2 mb-3">Profile Settings</h4>
                <form>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Display Name</label>
                            <input type="text" className="form-control" defaultValue="User" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" defaultValue="user@example.com" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary">Update Profile</button>
                </form>
            </div>

            <div className="bg-white p-4 mb-4 rounded shadow-sm border">
                <h4 className="border-bottom pb-2 mb-3">Household Preferences</h4>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Household Size</label>
                        <input type="number" className="form-control" style={{ maxWidth: '200px' }} defaultValue="2" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label d-block">Dietary Preferences</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="checkVegan" />
                            <label className="form-check-label" htmlFor="checkVegan">Vegan</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="checkVegetarian" />
                            <label className="form-check-label" htmlFor="checkVegetarian">Vegetarian</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="checkGlutenFree" />
                            <label className="form-check-label" htmlFor="checkGlutenFree">Gluten Free</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary">Save Preferences</button>
                </form>
            </div>

            <div className="bg-white p-4 mb-4 rounded shadow-sm border">
                <h4 className="border-bottom pb-2 mb-3">Notifications</h4>
                <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Enable Email Notifications</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Push Notifications</label>
                </div>
            </div>

            <div className="bg-white p-4 mb-4 rounded shadow-sm border">
                <h4 className="border-bottom pb-2 mb-3">Shopping Preferences</h4>
                <form>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Preferred Shopping Day</label>
                            <select className="form-select">
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Notification Time</label>
                            <input type="time" className="form-control" defaultValue="09:00" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary">Save Shopping Settings</button>
                </form>
            </div>
        </div>
    );
}

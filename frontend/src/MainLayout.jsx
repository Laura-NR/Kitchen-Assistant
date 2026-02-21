import React from 'react';
import SideBar from './components/SideBar';
import Header from './components/Header';

export default function MainLayout({ currentModule, onModuleChange, onLogout, activeTab, setActiveTab, showAddForm, setShowAddForm, children }) {
    return (
        <div style={{ display: 'flex' }}>
            <SideBar currentModule={currentModule} onModuleChange={onModuleChange} onLogout={onLogout} />
            <div style={{ marginLeft: '250px', padding: 0, width: 'calc(100% - 250px)', minHeight: '100vh', boxSizing: 'border-box', overflow: 'hidden' }}>
                <Header activeTab={activeTab} setActiveTab={setActiveTab} showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
                <div style={{ padding: '20px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

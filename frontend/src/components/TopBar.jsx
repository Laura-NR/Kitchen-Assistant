import React from 'react';
import '../TopBar.css';
import SearchBar from './SearchBar';
import NewRecipe from './NewRecipe';
import Categories from './categories';

function TopBar({ onSearchChange }) {
    return (
        <div className="top-bar">
            <div className="container-fluid">
                <div className="d-flex justify-content-end w-100">
                    <div className="w-50">
                        <SearchBar onSearchChange={onSearchChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;

import React from "react";

export default function Header({ activeTab, setActiveTab, showAddForm, setShowAddForm }) {
  return (
    <nav
      className="bg-primary w-100 position-relative d-flex flex-row justify-content-center align-items-center overflow-visible"
      style={{ height: "5rem" }}
    >
      <ul className="d-flex flex-row justify-content-around w-50 list-unstyled">
        <div className="d-flex flex-row gap-4">
          <li className="mt-4">
            <button className={`btn btn-link text-decoration-none ${activeTab === 'recipes' ? 'text-white fw-bold' : 'text-secondary'}`} onClick={() => setActiveTab('recipes')}>
              Recipes
            </button>
          </li>
          <li className="mt-4">
            <button className={`btn btn-link text-decoration-none ${activeTab === 'menus' ? 'text-white fw-bold' : 'text-secondary'}`} onClick={() => setActiveTab('menus')}>
              Menus
            </button>
          </li>
        </div>
        <li className="position-absolute top-100 start-50 translate-middle">
          <a href="#">
            <img
              src="/logo-green-background.png"
              alt="Household Assist logo with green background"
              className="z-index-1"
              style={{ width: "130px", height: "auto" }}
            />
          </a>
        </li>
        <div className="d-flex flex-row gap-4 align-items-center">
          <li className="mt-4">
            <button className={`btn btn-link text-decoration-none ${activeTab === 'shopping' ? 'text-white fw-bold' : 'text-secondary'}`} onClick={() => setActiveTab('shopping')}>
              Shopping
            </button>
          </li>
          <li className="mt-4">
            <button className={`btn btn-link text-decoration-none ${activeTab === 'tools' ? 'text-white fw-bold' : 'text-secondary'}`} onClick={() => setActiveTab('tools')}>
              Tools
            </button>
          </li>
        </div>
      </ul>
      {activeTab === 'recipes' && (
        <button
          className="btn btn-warning btn-sm fw-bold position-absolute end-0 me-4"
          onClick={() => setShowAddForm(true)}
        >
          + New Recipe
        </button>
      )}
    </nav>
  );
}

import React from "react";

export default function Header() {
  return (
    <nav
      className="bg-primary w-100 position-relative d-flex flex-row justify-content-center align-items-center overflow-visible"
      style={{ height: "5rem" }}
    >
      <ul className="d-flex flex-row justify-content-around w-50 list-unstyled">
        <div className="d-flex flex-row gap-4">
          <li className="mt-4">
            <a href="#" className="text-decoration-none text-secondary">
              Recipes
            </a>
          </li>
          <li className="mt-4">
            <a href="#" className="text-decoration-none text-secondary">
              Menus
            </a>
          </li>
        </div>
        <li className="position-absolute top-100 start-50 translate-middle">
          <a href="#">
            <img
              src="../../public/logo-green-background.png"
              alt="Household Assist logo with green background"
              className="z-index-1"
              style={{ width: "130px", height: "auto" }}
            />
          </a>
        </li>
        <div className="d-flex flex-row gap-4">
          <li className="mt-4">
            <a href="#" className="text-decoration-none text-secondary">
              Shopping
            </a>
          </li>
          <li className="mt-4">
            <a href="#" className="text-decoration-none text-secondary">
              Tools
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

import React from 'react';

export default function SideBar({ currentModule, onModuleChange, onLogout }) {
    const getLinkClass = (moduleName) => {
        return `nav-link ${currentModule === moduleName ? 'active text-white bg-primary' : 'text-dark'}`;
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3" style={{ width: '250px', height: '100vh', position: 'fixed', left: 0, top: 0, backgroundColor: '#EBCC5B' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4">House Assistant</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className={getLinkClass('kitchen')} onClick={() => onModuleChange('kitchen')}>
                        Kitchen
                    </a>
                </li>
                <li>
                    <a href="#" className={getLinkClass('garden')} onClick={() => onModuleChange('garden')}>
                        Garden
                    </a>
                </li>
                <li>
                    <a href="#" className={getLinkClass('zerowaste')} onClick={() => onModuleChange('zerowaste')}>
                        Zero Waste
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <strong>User</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#" onClick={() => onModuleChange('settings')}>Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={onLogout}>Sign out</a></li>
                </ul>
            </div>
        </div>
    );
}
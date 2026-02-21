import { useState, useEffect } from "react";
import Authenticate from "./components/Authenticate";
import RecipesApp from "./RecipesApp";
import Register from "./components/Register";
import MainLayout from "./MainLayout";
import GardenModule from "./GardenModule";
import ZeroWasteModule from "./ZeroWasteModule";
import SettingsModule from "./SettingsModule";


export default function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [currentModule, setCurrentModule] = useState('kitchen');

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setAuthenticated(true);
        }
    }, []);

    const onAuthenticatedChangedHandler = (newAuthValue, token) => {
        if (newAuthValue) {
            localStorage.setItem('jwt', token); // Save the token when logging in
        } else {
            localStorage.removeItem('jwt'); // Remove the token when logging out
        }
        setAuthenticated(newAuthValue);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setAuthenticated(false);
    };

    // Handler to switch to the registration form
    const switchToRegister = () => setShowRegister(true);
    const switchToLogin = () => setShowRegister(false);

    const [loginMessage, setLoginMessage] = useState('');
    const [loginMessageType, setLoginMessageType] = useState(''); // 'success' or 'error'

    // Handler for successful registration
    const onRegistrationSuccess = (message) => {
        setLoginMessage(message);
        setLoginMessageType('success');
        setShowRegister(false); // Go back to the login form
    };

    const [activeTab, setActiveTab] = useState('recipes');
    const [showAddForm, setShowAddForm] = useState(false);

    if (authenticated) {
        return (
            <MainLayout
                currentModule={currentModule}
                onModuleChange={setCurrentModule}
                onLogout={handleLogout}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
            >
                {currentModule === 'kitchen' && <RecipesApp activeTab={activeTab} setActiveTab={setActiveTab} showAddForm={showAddForm} setShowAddForm={setShowAddForm} />}
                {currentModule === 'garden' && <GardenModule />}
                {currentModule === 'zerowaste' && <ZeroWasteModule />}
                {currentModule === 'settings' && <SettingsModule />}
            </MainLayout>
        );
    } else {
        return (
            <>
                {showRegister ? (
                    <Register onRegistrationSuccess={onRegistrationSuccess} switchToLogin={switchToLogin} />
                ) : (
                    <>
                        <Authenticate onAuthenticatedChanged={onAuthenticatedChangedHandler} switchToRegister={switchToRegister} loginMessage={loginMessage} loginMessageType={loginMessageType} />
                    </>
                )}
            </>
        );
    }
}
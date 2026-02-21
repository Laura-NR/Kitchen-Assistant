// Garden API Client

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/garden`;

const getHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
});

// --- Plants (Master List) ---
export const fetchPlants = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/plants`, {
            headers: getHeaders(token)
        });
        if (!response.ok) throw new Error('Failed to fetch plants');
        return await response.json();
    } catch (error) {
        console.error('Error fetching plants:', error);
        return [];
    }
};

// --- My Plants ---
export const fetchMyPlants = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/my-plants`, {
            headers: getHeaders(token)
        });
        if (!response.ok) throw new Error('Failed to fetch my plants');
        return await response.json();
    } catch (error) {
        console.error('Error fetching my plants:', error);
        return [];
    }
};

export const addMyPlant = async (token, plantData) => {
    try {
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        // If plantData is NOT FormData, set Content-Type to application/json
        // But for this specific function, we expect FormData if image is present.
        // To be safe, let's assume if it is NOT FormData we stringify it.

        let body;
        if (plantData instanceof FormData) {
            body = plantData;
            // Content-Type header is set automatically by browser with boundary
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(plantData);
        }

        const response = await fetch(`${BASE_URL}/my-plants`, {
            method: 'POST',
            headers: headers,
            body: body
        });
        if (!response.ok) throw new Error('Failed to add plant');
        return await response.json();
    } catch (error) {
        console.error('Error adding plant:', error);
        throw error;
    }
};

export const waterPlant = async (token, myPlantId) => {
    try {
        const response = await fetch(`${BASE_URL}/my-plants/${myPlantId}/water`, {
            method: 'POST',
            headers: getHeaders(token)
        });
        if (!response.ok) throw new Error('Failed to water plant');
        return true;
    } catch (error) {
        console.error('Error watering plant:', error);
        return false;
    }
};

// --- Sensors ---
export const fetchSensors = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/sensors`, {
            headers: getHeaders(token)
        });
        if (!response.ok) throw new Error('Failed to fetch sensors');
        return await response.json();
    } catch (error) {
        console.error('Error fetching sensors:', error);
        return [];
    }
};

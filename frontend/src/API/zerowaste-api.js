// Zero Waste API Client

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/zerowaste`;

const getHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
});

export const fetchTips = async (token, keyword = '') => {
    try {
        let url = `${BASE_URL}/tips`;
        if (keyword) {
            url += `?keyword=${encodeURIComponent(keyword)}`;
        }

        const response = await fetch(url, {
            headers: getHeaders(token)
        });
        if (!response.ok) throw new Error('Failed to fetch tips');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tips:', error);
        return [];
    }
};

export const addTip = async (token, tipData) => {
    try {
        const response = await fetch(`${BASE_URL}/tips`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify(tipData)
        });
        if (!response.ok) throw new Error('Failed to add tip');
        return await response.json();
    } catch (error) {
        console.error('Error adding tip:', error);
        throw error;
    }
};

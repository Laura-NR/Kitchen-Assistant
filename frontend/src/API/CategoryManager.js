const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchCategories = async () => {
    const jwtToken = localStorage.getItem('jwt'); 
    try {
        const response = await fetch(`${API_URL}/api/categories`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Function to create a category
export const createCategory = async (categoryName) => {
    const jwtToken = localStorage.getItem('jwt');
    const url = `${API_URL}/api/categories`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) {
            throw new Error('Failed to add category');
        }

        return await response.json(); // Return the newly created category
    } catch (error) {
        console.error('Error creating category:', error);
        throw error; 
    }
};

export const updateCategory = async (categoryId, categoryName) => {
    const jwtToken = localStorage.getItem('jwt');
    const url = `${API_URL}/api/categories/${categoryId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) {
            throw new Error('Failed to update category');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export const deleteCategory = async (categoryId, token) => {
    const url = `${API_URL}/api/categories/${categoryId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Deletion failed: ${errorText}`);
        }

        return response.status === 204 ? true : await response.json(); 
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};


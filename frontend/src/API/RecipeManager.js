const API_URL = import.meta.env.VITE_BACKEND_URL;

const sendRecipeData = async (method, url, formData, token) => {
    const formDataWithFile = new FormData();
    formDataWithFile.append('title', formData.title);
    formDataWithFile.append('instructions', formData.instructions);
    
    if (formData.categoryId) {
        formDataWithFile.append('categoryId', formData.categoryId); 
    }
    
    if (formData.picture) {
        formDataWithFile.append('picture', formData.picture);
    }

    if (formData.ingredients) {
        formDataWithFile.append('ingredients', JSON.stringify(formData.ingredients));
    }
    
    formDataWithFile.append('sourceLink', formData.link || '');

    try {
        const response = await fetch(url, {
            method,
            body: formDataWithFile,
            headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = response.status !== 204 ? await response.json() : null;

        if (!response.ok) {
            throw new Error(data?.message || 'Failed to save recipe');
        }

        return data;
    } catch (error) {
        console.error(`Error saving recipe:`, error);
        throw error;
    }
};

export const createRecipe = async (formData, token) => {
    return await sendRecipeData('POST', `${API_URL}/api/recipes`, formData, token);
};

export const updateRecipe = async (id, formData, token) => {
    return await sendRecipeData('PUT', `${API_URL}/api/recipes/${id}`, formData, token);
};

export const deleteRecipe = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/api/recipes/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data?.message || 'Failed to delete recipe');
        }

        return true;
    } catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;
    }
};

export const fetchRecipes = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/recipes`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};
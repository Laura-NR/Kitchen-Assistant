import React, { useState, useEffect } from 'react';
import AddRecipeForm from './components/AddRecipeForm';
import UpdateRecipeForm from './components/UpdateRecipeForm';
import Recipes from './components/recipes';
import TopBar from './components/TopBar';
import CategoriesDisplay from './components/CategoriesDisplay';
import { fetchRecipes, deleteRecipe as deleteRecipeAPI } from './API/recipe-manager';
import { fetchCategories } from './API/category-manager';
import RecipeCounter from './components/RecipeCounter';
import EditCategoryForm from './components/EditCategoryForm';
import MenuPlanner from './components/MenuPlanner';
import ShoppingList from './components/ShoppingList';

export default function RecipesApp({ activeTab, setActiveTab, showAddForm, setShowAddForm }) {
  // const [showAddForm, setShowAddForm] = useState(false); // LIFTED TO APP.JSX
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [recipes, setRecipes] = useState([]); // State to hold recipes data
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [isSortedAsc, setIsSortedAsc] = useState(true); // true for ascending, false for descending

  // Category logic removed as requested

  useEffect(() => {
    const init = async () => {
      const jwt = localStorage.getItem('jwt');
      try {
        const recipesData = await fetchRecipes(jwt);
        console.log('Fetched recipes:', recipesData); // Debugging line
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    init();
  }, []);

  const refreshRecipes = async (categoryId = 'All') => {
    const jwtToken = localStorage.getItem('jwt');
    const updatedRecipes = await fetchRecipes(jwtToken, categoryId);
    setRecipes(updatedRecipes);
  };

  const handleCategoryFilterChange = (categoryId) => {
    // Call the function to refresh recipes with the selected category ID
    refreshRecipes(categoryId);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm.toLowerCase());
  };

  const filteredRecipes = recipes.filter(recipe => {
    const term = searchTerm.toLowerCase();
    // Check title
    if (recipe.title?.toLowerCase().includes(term)) return true;
    // Check description (if any)
    if (recipe.description?.toLowerCase().includes(term)) return true;
    // Check ingredients (string)
    if (recipe.ingredients?.toLowerCase().includes(term)) return true;
    // Check category name (if populated by backend join)
    if (recipe.categoryName?.toLowerCase().includes(term)) return true;

    return false;
  });

  const toggleSortOrder = () => {
    setIsSortedAsc(!isSortedAsc);
  };

  const sortedFilteredRecipes = filteredRecipes.sort((a, b) => {
    return isSortedAsc ? a.id - b.id : b.id - a.id;
  });

  // Method to delete a recipe
  const deleteRecipe = async (id) => {
    const jwtToken = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage
    const success = await deleteRecipeAPI(id, jwtToken);
    if (success) {
      // Update the local state to remove the deleted recipe if delete was successful
      setRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== id));
    } else {
      console.error('Failed to delete recipe');
    }
  };

  const displayedRecipeCount = sortedFilteredRecipes.length;

  return (
    <>


      {activeTab === 'recipes' && (
        <>
          <div className="container mt-1">
            <TopBar onSearchChange={handleSearchChange} />
            {showAddForm && !editingRecipe && <AddRecipeForm setShowAddForm={setShowAddForm} fetchRecipes={refreshRecipes} onRecipesUpdated={refreshRecipes} />}
            {showUpdateForm && editingRecipe && <UpdateRecipeForm setShowUpdateForm={setShowUpdateForm} fetchRecipes={refreshRecipes} editingRecipe={editingRecipe} setEditingRecipe={setEditingRecipe} onRecipesUpdated={refreshRecipes} />}
          </div>

          <div className="container d-flex flex-row justify-content-between align-items-center mb-3 mt-4">
            <button onClick={toggleSortOrder} className="btn btn-primary">&#8645; Sort</button>
            <RecipeCounter recipeCount={displayedRecipeCount} />
          </div>
          <div className="recipes-grid">
            <Recipes recipes={sortedFilteredRecipes} onDelete={deleteRecipe} setEditingRecipe={setEditingRecipe} setShowUpdateForm={setShowUpdateForm} />
          </div>
        </>
      )}

      {activeTab === 'menus' && <MenuPlanner />}
      {activeTab === 'shopping' && <ShoppingList />}
    </>
  );
}

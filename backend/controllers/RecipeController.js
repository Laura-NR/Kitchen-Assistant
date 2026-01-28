const { RecipeService } = require('../services/RecipeService.js');

const recipeService = new RecipeService();

class RecipeController {
  async listAll(req, res) {
    try {
      const recipes = await recipeService.getAllRecipes(req.userId, req.query.category);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipes' });
    }
  }

  async create(req, res) {
    try {
      const recipeData = {
        ...req.body,
        imagePath: req.file ? `/assets/${req.file.filename}` : null
      };
      
      const newRecipe = await recipeService.createRecipe(recipeData, req.userId);
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating recipe' });
    }
  }

  async destroy(req, res) {
    try {
      await recipeService.deleteRecipe(req.params.id, req.userId);
      res.status(200).json({ message: "Recipe deleted" });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting recipe' });
    }
  }
}

module.exports = { RecipeController };
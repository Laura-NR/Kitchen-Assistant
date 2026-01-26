export class RecipeService {
    constructor(recipeDAO) {
      this.recipeDAO = recipeDAO;
    }

    async createRecipe(recipeData, userId) {
        const fullRecipeData = {
          ...recipeData,
          date: new Date(),
          user: userId
        };
        
        return this.recipeDAO.create(fullRecipeData);
      }
    
    async updateRecipe(id, recipeData) {
    return this.recipeDAO.update(id, recipeData);
    }
  
    async getAllRecipes(userId, category) {
      const results = await this.recipeDAO.findAll(userId, category);
      return results.map(recipe => this._transformImagePath(recipe));
    }
  
    _transformImagePath(recipe) {
      return {
        ...recipe,
        image: recipe.image ? recipe.image.replace(/^.*[\\\/]/, '/assets/') : null
      };
    }

    async deleteRecipe(recipeId) {
        const affectedRows = await this.recipeDAO.delete(recipeId);
        
        if (affectedRows === 0) {
          throw new Error('Recipe not found');
        }
        
        return { success: true };
      }
  }
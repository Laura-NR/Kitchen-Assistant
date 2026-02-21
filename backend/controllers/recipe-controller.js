import multer from 'multer';
import { app } from '../app.js';
import { upload } from '../config/multer.js';
import 'dotenv/config';

export class RecipeController {
  constructor(recipeService) {
    this.recipeService = recipeService;
  }

  async listAll(req, res) {
    try {
      const recipes = await this.recipeService.getAllRecipes(
        req.userId,
        req.query.category
      );
      res.json(recipes);
    } catch (error) {
      this.handleError(res, error, 'Error fetching recipes');
    }
  }


  async create(req, res) {
    try {
      const recipeData = {
        ...req.body,
        image: req.file ? `/assets/${req.file.filename}` : null
      };

      const createdRecipe = await this.recipeService.createRecipe(
        recipeData,
        req.userId
      );

      res.status(201).json({
        status: 'success',
        data: createdRecipe
      });
    } catch (error) {
      this.handleError(res, error, 'Error creating recipe');
    }
  }

  async update(req, res) {
    try {
      const recipeData = {
        ...req.body,
        image: req.file ? `/assets/${req.file.filename}` : undefined
      };

      await this.recipeService.updateRecipe(
        req.params.id,
        recipeData
      );

      res.json({ success: true });
    } catch (error) {
      this.handleError(res, error, 'Error updating recipe');
    }
  }

  async destroy(req, res) {
    try {
      await this.recipeService.deleteRecipe(req.params.id);
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      if (error.message === 'Recipe not found') {
        res.status(404).json({ message: error.message });
      } else {
        this.handleError(res, error, 'Error deleting recipe');
      }
    }
  }

  handleError(res, error, defaultMessage) {
    console.error(error);
    const status = error.statusCode || 500;
    const message = error.message || defaultMessage;
    res.status(status).json({ error: message });
  }
}

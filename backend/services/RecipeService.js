const prisma = require('../config/prisma.js');

class RecipeService {
    async createRecipe(recipeData, userId) {
        const { title, instructions, categoryId, imagePath, sourceLink, ingredients } = recipeData;

        const parsedIngredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

        return await prisma.recipe.create({
            data: {
                title,
                instructions,
                imagePath,
                sourceLink,
                userId: userId,
                categoryId: categoryId ? parseInt(categoryId) : null,
                ingredients: {
                    create: parsedIngredients?.map(ing => ({
                        quantity: parseFloat(ing.quantity),
                        unit: ing.unit,
                        ingredient: {
                            connectOrCreate: {
                                where: { name: ing.name },
                                create: { name: ing.name }
                            }
                        }
                    }))
                }
            },
            include: { ingredients: { include: { ingredient: true } } }
        });
    }

    async getAllRecipes(userId, categoryId) {
        return await prisma.recipe.findMany({
            where: {
                userId,
                ...(categoryId && { categoryId: parseInt(categoryId) })
            },
            include: { category: true, ingredients: { include: { ingredient: true } } }
        });
    }

    async deleteRecipe(id, userId) {
        return await prisma.recipe.delete({
            where: { id: parseInt(id), userId }
        });
    }
}

module.exports = { RecipeService };
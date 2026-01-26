export class RecipeDAO {
    constructor(database) {
      this.db = database;
    }
  
    async findAll(userId, categoryId) {
      let query = `
        SELECT recipes.*, categories.name AS categoryName
        FROM recipes
        LEFT JOIN categories ON recipes.category = categories.id
        WHERE recipes.user = ?
      `;
      
      const params = [userId];
      if (categoryId) {
        query += " AND recipes.category = ?";
        params.push(categoryId);
      }
  
      return this.db.query(query, params);
    }
  
    async create(recipeData) {

      const sql = 'INSERT INTO recipes (title, ingredients, instructions, image, date, link, category, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

      const currentDate = new Date();

      return this.db.query(sql, [
        recipeData.title, 
        recipeData.ingredients, 
        recipeData.instructions, 
        recipeData.imagePath, 
        recipeData.currentDate, 
        recipeData.link, 
        recipeData.category, 
        recipeData.userId]);
    }

    async update(id, recipeData) {
        let sql = `UPDATE recipes SET 
          title = ?, 
          ingredients = ?, 
          instructions = ?, 
          link = ?, 
          category = ?`;
        
        const params = [
          recipeData.title,
          recipeData.ingredients,
          recipeData.instructions,
          recipeData.link,
          recipeData.category
        ];
    
        if (recipeData.image) {
          sql += ', image = ?';
          params.push(recipeData.image);
        }
    
        sql += ' WHERE id = ?';
        params.push(id);
    
        return this.db.query(sql, params);
      }
    
      async delete(id) {
        const result = await this.db.query(
          'DELETE FROM recipes WHERE id = ?', 
          [id]
        );
        return result.affectedRows; // Returns number of deleted rows
      }
  }
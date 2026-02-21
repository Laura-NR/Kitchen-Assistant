export class RecipeDAO {
  constructor(database) {
    this.db = database;
  }

  async findAll(userId, categoryId) {
    let query = `
        SELECT recipes.*, categories.name AS categoryName
        FROM recipes
        LEFT JOIN categories ON recipes.category = categories.id
        WHERE recipes.user = $1
      `;

    const params = [userId];
    if (categoryId) {
      query += " AND recipes.category = $2";
      params.push(categoryId);
    }

    return this.db.query(query, params);
  }

  async create(recipeData) {

    const sql = 'INSERT INTO recipes (title, ingredients, instructions, image, date, link, category, "user") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';

    const rows = await this.db.query(sql, [
      recipeData.title,
      recipeData.ingredients,
      recipeData.instructions,
      recipeData.imagePath,
      recipeData.currentDate,
      recipeData.link,
      recipeData.category,
      recipeData.userId]);

    return rows[0].id;
  }

  async update(id, recipeData) {
    let sql = `UPDATE recipes SET 
          title = $1, 
          ingredients = $2, 
          instructions = $3, 
          link = $4, 
          category = $5`;

    const params = [
      recipeData.title,
      recipeData.ingredients,
      recipeData.instructions,
      recipeData.link,
      recipeData.category
    ];

    let paramIndex = 6;

    if (recipeData.image) {
      sql += `, image = $${paramIndex}`;
      params.push(recipeData.image);
      paramIndex++;
    }

    sql += ` WHERE id = $${paramIndex}`;
    params.push(id);

    return this.db.query(sql, params);
  }

  async delete(id) {
    const result = await this.db.query(
      'DELETE FROM recipes WHERE id = $1',
      [id]
    );
    return true;
  }
}
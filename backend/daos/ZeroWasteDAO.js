export class ZeroWasteDAO {
    constructor(database) {
        this.db = database;
    }

    async getAllTips() {
        return this.db.query("SELECT * FROM waste_tips ORDER BY ingredient_keyword");
    }

    async getTipsByKeyword(keyword) {
        return this.db.query(
            "SELECT * FROM waste_tips WHERE ingredient_keyword ILIKE $1",
            [`%${keyword}%`]
        );
    }

    async addTip(keyword, suggestion, category) {
        const rows = await this.db.query(
            "INSERT INTO waste_tips (ingredient_keyword, suggestion, category) VALUES ($1, $2, $3) RETURNING id",
            [keyword, suggestion, category]
        );
        return rows[0].id;
    }
}

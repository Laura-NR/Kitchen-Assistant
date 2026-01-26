export class Recipe {
    constructor({ id, title, ingredients, instructions, date, image, link, category, user }) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.date = date;
        this.image = image;
        this.link = link;
        this.category = category;
        this.user = user;
    }
}
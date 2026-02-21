-- Drop existing tables to ensure clean schema
DROP TABLE IF EXISTS recipe_ingredients CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS shopping_list_items CASCADE;
DROP TABLE IF EXISTS shopping_lists CASCADE;
DROP TABLE IF EXISTS purchase_history CASCADE;
DROP TABLE IF EXISTS my_plants CASCADE;
DROP TABLE IF EXISTS plants CASCADE;
DROP TABLE IF EXISTS sensor_readings CASCADE;
DROP TABLE IF EXISTS sensors CASCADE;
DROP TABLE IF EXISTS waste_tips CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;

-- Create Ingredients Table
CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    default_unit VARCHAR(50),
    category VARCHAR(50)
);

-- Create Recipes Table (Re-creating simply for context, assumes exist or need creation)
-- Create Users Table if not exists
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "user" INT DEFAULT NULL,
    FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT, -- Legacy text field
    instructions TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    link VARCHAR(255),
    category INT,
    "user" INT, -- user is reserved keyword in PG, quoted
    FOREIGN KEY (category) REFERENCES categories(id)
);

-- Create Recipe Ingredients Table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity DECIMAL(10, 2),
    unit VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

-- Create Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity DECIMAL(10, 2),
    expiry_date DATE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

-- Create Menus Table
CREATE TABLE IF NOT EXISTS menus (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    household_size INT DEFAULT 1
);

-- Create Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    menu_id INT NOT NULL,
    recipe_id INT NOT NULL,
    day_of_week VARCHAR(20),
    meal_type VARCHAR(50),
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- Create Shopping Lists Table
CREATE TABLE IF NOT EXISTS shopping_lists (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);

-- Create Shopping List Items Table
CREATE TABLE IF NOT EXISTS shopping_list_items (
    id SERIAL PRIMARY KEY,
    list_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity DECIMAL(10, 2),
    unit VARCHAR(50), 
    checked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (list_id) REFERENCES shopping_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

-- Create Purchase History Table
CREATE TABLE IF NOT EXISTS purchase_history (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity DECIMAL(10, 2),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

-- Gardner Module Tables

-- Create Plants Table
CREATE TABLE IF NOT EXISTS plants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    variety VARCHAR(255),
    scientific_name VARCHAR(255),
    germination_days INT,
    watering_frequency_days INT
);

-- Create My Plants Table
CREATE TABLE IF NOT EXISTS my_plants (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    nickname VARCHAR(255),
    location VARCHAR(100),
    planted_at DATE,
    last_watered_at TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

-- Create Sensors Table
CREATE TABLE IF NOT EXISTS sensors (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255),
    type VARCHAR(50),
    data_source_url VARCHAR(255)
);

-- Create Sensor Readings Table
CREATE TABLE IF NOT EXISTS sensor_readings (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    value DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensors(id) ON DELETE CASCADE
);

-- Zero Waste Module Tables

-- Create Waste Tips Table
CREATE TABLE IF NOT EXISTS waste_tips (
    id SERIAL PRIMARY KEY,
    ingredient_keyword VARCHAR(255) NOT NULL,
    suggestion TEXT NOT NULL,
    category VARCHAR(50)
);

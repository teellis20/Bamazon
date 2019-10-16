DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(10) NOT NULL,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1111, "Comfy Dog Bed", "Pets", 30.00, 14);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1112, "Gold Soap Dispenser", "Home & Kitchen", 12.95, 26);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1113, "Bluetooth Speaker", "Electronics", 85.00, 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1114, "Hair Spray", "Beauty", 9.94, 32);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1115, "Air Fryer", "Home & Kitchen", 120.00, 7);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1116, "Apple Watch", "Electronics", 397.99, 20);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1117, "Squeeky Toy", "Pets", 4.75, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1118, "Nerf Gun", "Toys & Games", 40.00, 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1119, "Garden Hose", "Garden & Outdoor", 29.95, 7);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1120, "Starwars Lego Set", "Toys & Games", 47.32, 12);
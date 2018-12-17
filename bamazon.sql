DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
use bamazon;

CREATE table products (
item_id INT(11) NOT NULL auto_increment,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity Int(5) NOT NULL,
primary key (item_id)
);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Fashion", 39.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Fashion", 49.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Fashion", 19.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Fashion", 79.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone X", "Electronics", 1000.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gamecube", "Electronics", 45.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 2000.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Bat", "Sports", 49.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Glove", "Sports", 69.99, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports", 29.99, 30);

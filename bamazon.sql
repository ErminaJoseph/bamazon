ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bamazon';

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 500.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HDMI cable", "electronics", 12, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mascara", "beauty", 7, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("foundation", "beauty", 13, 98);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tupperware", "household items", 15, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pack of light bulbs", "household items", 8.50, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sofa", "furniture", 750, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee table", "furniture", 150, 99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pack of pencils", "office supplies", 5, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notebook", "office supplies", 4, 300);
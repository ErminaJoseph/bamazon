ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

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
VALUES ("HDMI cable", "electronics", 12, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mascara", "beauty", 7, 3);

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

ALTER TABLE products
ADD product_sales INT(50) NOT NULL;

CREATE TABLE departments (
department_id INT(10) NOT NULL AUTO_INCREMENT,
department_name VARCHAR(50) NOT NULL,
overhead_costs INT(50) NOT NULL,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("office supplies", 10000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("beauty", 5000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("furniture", 300000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("household items", 275000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("electronics", 450000);

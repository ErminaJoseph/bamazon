var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bamazon",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    managerTasks();
});

function managerTasks() {
    inquirer
    .prompt(
        {
            name: "task",
            type: "list",
            message: "Please make a selection",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    )
    .then(function(answer) {
        if (answer.task === "View Products for Sale") {
            viewProducts();
            connection.end();
        } else if (answer.task === "View Low Inventory") {
            connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5", function(err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++) {
                    console.log(
                        "Item ID: " + 
                        results[i].item_id  +
                        " || Product Name: " +
                        results[i].product_name +
                        " || Price: " +
                        results[i].price +
                        " || Inventory: " +
                        results[i].stock_quantity
                    )
                }
            });
            connection.end();
        } else if (answer.task === "Add to Inventory") {
            viewProducts();
            connection.query("SELECT * FROM products", function (err, results) {
                if (err) throw err;
                inquirer
                .prompt([
                    {
                        name: "item",
                        type: "input",
                        message: "Confirm that the Item ID that you would like to update",
                        validate: function(value) {
                            if (isNaN(value) === false) {
                            return true;
                            }
                            return false;
                        }
                    },
                    {
                        name: "quantity",
                        type: "number",
                        message: "Confirm how much you'd like to add",
                        validate: function(value) {
                            if (isNaN(value) === false) {
                            return true;
                            }
                            return false;
                        }
                    }
                ])
                .then(function(answer) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].item_id === parseInt(answer.item)) {
                            var itemID = results[i];
                        
                        }
                    }
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (itemID.stock_quantity + answer.quantity)
                            },
                            {
                                item_id: answer.item
                            }
                        ],
                        function(error) {
                            if (error) throw error;
                        }
                    )

                    console.log("Inventory has been updated!");
                    console.log("Updated table below");
                    viewProducts();
                    connection.end();
                });   
            });   
        } else if (answer.task === "Add New Product") {
            inquirer
            .prompt([
                {
                    name: "product",
                    type: "input",
                    message: "Enter the name of the product:"
                },
                {
                    name: "department",
                    type: "input",
                    message: "Enter the name of the department:"
                },
                {
                    name: "price",
                    type: "number",
                    message: "Enter the price of this item:",
                    validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                        }
                        return false;
                    }
                },
                {
                    name: "inventory",
                    type: "number",
                    message: "Enter the amount available in stock:",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                            }
                            return false;
                    }
                }
            ])
            .then(function(answer) {
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product_name: answer.product,
                        department_name: answer.department,
                        price: answer.price,
                        stock_quantity: answer.inventory
                    },
                        function(err) {
                        if (err) throw err;
                        }
                    )

                console.log("Product has been added!");
                console.log("Updated table below:");
                viewProducts();
                connection.end(); 
            });
        }
    });

    function viewProducts() {
        connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                console.log(
                "Item ID: " + 
                results[i].item_id  +
                " || Product Name: " +
                results[i].product_name +
                " || Price: " +
                results[i].price +
                " || Inventory: " +
                results[i].stock_quantity
                )
            } 
        });
    }
}
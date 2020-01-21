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
    makePurchase();
});


function makePurchase() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id);
            console.log("Product Name: " + results[i].product_name);
            console.log("Department Name: " + results[i].department_name);
            console.log("Price: " + results[i].price);
            console.log("Inventory: " + results[i].stock_quantity);
            console.log("**********************************************************")
        } 

        inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the item you'd like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of this product would you like to buy?",
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

            if (itemID.stock_quantity < parseInt(answer.quantity)) {
                console.log("Insufficient quantity!");
                connection.end();
            } else if (itemID.stock_quantity >= parseInt(answer.quantity)) {
                var totalCost = answer.quantity * itemID.price
                console.log("Purchase Completed!  The total cost is: " + totalCost);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (itemID.stock_quantity - answer.quantity)
                        },
                        {
                            item_id: answer.item
                        }
                    ],
                    function(error) {
                        if (error) throw error;
                        
                    }
                    
                )

                console.log("Updated Table Below");
                connection.query("SELECT * FROM products", function(err, results) {
                    if (err) throw err;
                    for (var i = 0; i < results.length; i++) {
                        console.log("Item ID: " + results[i].item_id);
                        console.log("Product Name: " + results[i].product_name);
                        console.log("Department Name: " + results[i].department_name);
                        console.log("Price: " + results[i].price);
                        console.log("Inventory: " + results[i].stock_quantity);
                        console.log("**********************************************************")
                    } 
                });

                connection.end();


            } else {
                console.log("You request could not be completed, please try again!")
                connection.end();
            }
        });
    });     
}

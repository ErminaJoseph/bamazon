var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    supervisorTasks();
});

function supervisorTasks() {
    inquirer
        .prompt(
            {
                name: "task",
                type: "list",
                message: "Please make a selection",
                choices: ["View Product Sales by Department", "Create New Department"]
            }
        )
        .then(function(answer) {
            if (answer.task === "View Product Sales by Department") {
                var query = "SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS product_sales "
                    query += "FROM products INNER JOIN departments ON departments.department_name=products.department_name "
                    query += "GROUP BY department_name, department_id ORDER BY department_id ASC;"
                connection.query(query, function(err, results) {
                    if (err) throw err;
                    for (var i = 0; i < results.length; i++) {
                        var profits = (results[i].product_sales - results[i].overhead_costs)
                        console.log(
                            "Department ID: " +
                            results[i].department_id +
                            " || Department Name: " +
                            results[i].department_name +
                            " || Overhead Costs: " +
                            results[i].overhead_costs +
                            " || Product Sales: " +
                            results[i].product_sales +
                            " || Total Profits: " +
                            profits  
                        );
                    }
                });

                connection.end();

            } else if (answer.task === "Create New Department") {
                inquirer
                .prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter the department name:"
                },
                {
                    name: "overhead",
                    type: "number",
                    message: "Enter the overhead cost:",
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
                    "INSERT INTO departments SET ?",
                    {
                        department_name: answer.name,
                        overhead_costs: answer.overhead
                    },
                        function(err) {
                        if (err) throw err;
                        }
                    );

                console.log("Department has been added!");
                console.log("Updated table below:")

                connection.query("SELECT * FROM departments", function(err, results) {
                    if (err) throw err;
                    for (var i = 0; i < results.length; i++) {
                        console.log(
                            "Department ID: " +
                            results[i].department_id +
                            " || Department Name: " +
                            results[i].department_name +
                            " || Overhead Costs: " +
                            results[i].overhead_costs
                        );
                    }
                });

                connection.end();
            });

            

            }
        });
    
}
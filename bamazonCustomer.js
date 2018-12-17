var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
      if (err) throw err;
    console.log("connected as id " + connection.threadId);
      getData();
  });

function getData() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        // Converting the response into a string //
        var data = JSON.stringify(res);
        // Converting response into an object //
        data = JSON.parse(data);

        bamazonStart(data);
    });
}

function bamazonStart(data) {
    inquirer.prompt([
        {
            type: "list",
            message: "Which product would you like to buy?",
            name: "selection",
            choices: function () {
                var selectionArray = [];
                for (var i = 0; i < data.length; i++) {
                    selectionArray.push(data[i].product_name);
                }
                return selectionArray;
            }
       },
        {
            type: "input",
            message: "How many would you like to purchase?",
            name: "quantity"
       }
    ]).then(function (userInputs) {
        // console.log(userInputs);
        
        var selectedItem;
        for (var i = 0; i < data.length; i++) {
            if (data[i].product_name === userInputs.selection) {
                selectedItem = data[i];
            }
        }
        // console.log(selectedItem);
        
        if (userInputs.quantity <= selectedItem.stock_quantity) {
            console.log("There is enough stock for your order!");

            var newStock = "UPDATE products SET stock_quantity = "
                + (selectedItem.stock_quantity - userInputs.quantity)
                + " WHERE id = "
                + userInputs.selection;
            
            connection.query(newStock, function (err) {
                if (err) throw err;
                console.log("Placed Order");

                connection.end();
                
            });
        } else {
            console.log("There is not enough in stock");
            
        }
   })
    
}

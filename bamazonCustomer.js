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
    connection.query("SELECT * FROM products", function (err, res) {
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
        // console.log(selectedItem.stock_quantity);

        
        if (userInputs.quantity <= selectedItem.stock_quantity) {
            console.log("Order is on the way!");
            var price = (parseFloat(selectedItem.price));
            var totalQuantity = userInputs.quantity;
            var total = totalQuantity * price;
            total.toFixed(2);
            console.log("Your total cost is " + total);
            connection.end();
              
        } else {
            console.log("There is not enough in stock");
            connection.end();            
        }
   })
    
}

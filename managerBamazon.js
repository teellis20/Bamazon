require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");

var connection = mysql.createConnection({
    host: keys.db.host,
    port: 3306,
    user: keys.db.username,
    password: keys.db.password,
    database: "bamazon_db"
})

var confirmer = false;

connection.connect(function(err, res) {
    if (err) throw err;
    console.log("connection successful!");
    promptManager(res);
})

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity + "\n");
        }
        promptManager(res);
    });
};

function promptManager(res) {
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Choose what you would like to do",
        choices: ["View All Inventory", "View Low Inventory", "Restock", "Add New Product", "Quit"]
    }).then(function(answer) {
        if (answer.menu === "View All Inventory") {
            viewProducts();
        } else if (answer.menu === "View Low Inventory") {
            viewLow();
        } else if (answer.menu === "Restock") {
            restock();
        } else if (answer.menu === "Add New Product") {
            addProduct();
        } else {
            console.log("Goodbye!");
            connection.end();
        }
    });
}

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function(err, res) {
        if (res.length) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "||" + res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity + "\n");
        }
     } else { 
        console.log("There are no items with their stock lower than 5! \n")

    }
    
        promptManager(res);
    });
}

function restock() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What item would you like to restock?"
        // validate: function(value) {
        //     validator(value);
        //     if (confirmer === true) {
        //         return true;
        //     } 
        //     return false;
        // }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many would you like total?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }
    ]).then(function(answer) {
        connection.query("UPDATE products SET ? WHERE ?",
        [{
            stock_quantity: answer.quantity
        },
        {
            product_name: answer.item
        }], function(err, res) {
            if (err) throw err;
            console.log("Item has been restocked!\n")
            promptManager(res);
        })
       
    })
};

function addProduct() {inquirer.prompt([{
    name: "item",
    type: "input",
    message: "What new product would you like to add?"
},
{
    name: "quantity",
    type: "input",
    message: "How many would you like total?",
    validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
    }
},
{
    name: "price",
    type: "input",
    message: "How much does it cost?",
    validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
    }
},
{
    name: "department",
    type: "input",
    message: "What department does the product belong in?"
},
{
    name: "id",
    type: "input",
    message: "Give your item an id # (ex: 2222)",
    validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
    }
}
]).then(function(answer) {
    connection.query("INSERT INTO products SET ?",
    [{
        product_name: answer.item,
        stock_quantity: answer.quantity,
        price: answer.price,
        department_name: answer.department,
        item_id: answer.id
        
    }], function(err, res) {
        if (err) throw err;
        console.log("Item has been added!\n")
        promptManager(res);
    })
   
})


}


// function validator(ans) {
//     connection.query("SELECT * FROM products", function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//             if (res[i].product_name === ans) {
//             confirmer = true;
//             return;
//         } else {
//             confirmer = false;
//         }
//     }
//     if (confirmer === false) {
//         console.log("\n");
//         console.log(ans + " is not a valid item, please select a listed item.\n")
        
//     }
// })
// }
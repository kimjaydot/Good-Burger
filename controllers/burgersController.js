
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    console.log(db.Burgers);
    db.Burgers.findAll({}).then(function(dbBurgers) {
      // We have access to the todos as an argument inside of the callback function
     //Use Render
     console.log({dbBurgers})
     res.render("index", {'burger_data': dbBurgers} );
      // res.json(dbBurgers);
    });
  });
  // POST route for saving a new todo
  app.post("/burgers/create", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Burgers.create({
      //burger_name, devoured
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurgers) {
      // We have access to the new todo as an argument inside of the callback function
      // res.json(dbBurgers);
       res.redirect("/");
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/burgers/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
      res.redirect("/");
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/burgers/update", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    //burger_name, devoured
    db.Burgers.update({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
      res.redirect("/");
    });
  });

};



// var express = require("express");

// var router = express.Router();
// var burgers = require("../models/burger.js");

// // get route -> index
// router.get("/", function(req, res) {
//   res.redirect("/burgers");
// });

// router.get("/burgers", function(req, res) {
//   // express callback response by calling burger.selectAllBurger
//   burgers.all(function(burgerData) {
//     // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
//     res.render("index", { burger_data: burgerData });
//   });
// });

// // post route -> back to index
// router.post("/burgers/create", function(req, res) {
//   // takes the request object using it as input for buger.addBurger
//   burgers.create(req.body.burger_name, function(result) {
//     // wrapper for orm.js that using MySQL insert callback will return a log to console,
//     // render back to index with handle
//     console.log(result);
//     res.redirect("/");
//   });
// });

// // put route -> back to index
// router.put("/burgers/update", function(req, res) {
//   burgers.update(req.body.burger_id, function(result) {
//     // wrapper for orm.js that using MySQL update callback will return a log to console,
//     // render back to index with handle
//     console.log(result);
//     res.redirect("/");
//   });
// });

// module.exports = router;

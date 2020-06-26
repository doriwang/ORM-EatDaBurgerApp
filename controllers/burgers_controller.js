var express = require("express")
var burger = require("../models/burger.js")

var router = express.Router()

// use routes to collect user input/data
router.get("/", function (req, res) {
    burger.all(function (data) {
        res.render("index", {
            burgers: data
        })
        console.log("test")
    })
})

router.post("/api/burgers", function (req, res) {
    burger.create(["burger_name", "devoured"], [req.body.burger, req.body.devoured], function (result) {
        res.json({
            // Send back the ID of the new quote
            id: result.insertId
        })
    })
})

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.param.id
    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router
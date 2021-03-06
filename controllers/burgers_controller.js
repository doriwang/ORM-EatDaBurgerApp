var express = require("express")
var burger = require("../models/burger.js")

var router = express.Router()

// use routes to collect user input/data
router.get("/", function (req, res) {
    burger.all(function (data) {
        res.render("index", {
            burgers: data
        })
    })
})

router.post("/api/burgers", function (req, res) {
    burger.create(["burger_name"], [req.body.burger_name], function (result) {
        res.json({
            // Send back the ID of the new quote
            id: result.insertId
        })
    })
})

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id
    burger.update({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router
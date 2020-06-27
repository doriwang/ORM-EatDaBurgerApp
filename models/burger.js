var orm = require("../config/orm.js")

// create a burger object instance of orm
//input tableName, pass in matching arguments as defined in orm, cb is a function, 
var burger = {
    all: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res)
        })
    },
    create: function (columns, values, cb) {
        orm.insertOne("burgers", columns, values, function (res) {
            cb(res)
        })
    },
    update: function (objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            cb(res)
        })
    },
    delete: function (condition, cb) {
        orm.deleteOne("burgers", condition, function (res) {
            cb(res)
        })
    }
}

module.exports = burger
var connection = require("../config/connection.js");

// to help determining how many (?) marks VALUES to be insert later
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    // ["?", "?"] will be ["?,?"], represent VALUES ("burger", true)
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function (tableName, cb) {
        var query = "SELECT * FROM " + tableName + ";";
        connection.query(query, function (err, result) {
            if (err) {
                console.error("error connecting: " + err.stack)
            }
            cb(result)
        })
    },
    insertOne: function (tableName, columns, values, cb) {
        // values will be an arr of values, will manually input columns and insert values upon user input
        var query = "INSERT INTO " + tableName + " (" + columns.toString() + ") VALUES (" + printQuestionMarks(values.length) + ") ";
        connection.query(query, values, function (err, result) {
            if (err) throw err
            cb(result)

        })
    },
    updateOne: function (tableName, objColVals, condition, cb) {
        var query = "UPDATE " + tableName + " SET " + objToSql(objColVals) + " WHERE " + condition;
        connection.query(query, function (err, result) {
            if (err) throw err
            cb(result)
        })
    },
    deleteOne: function (tableName, condition, cb) {
        var query = "DELETE FROM " + tableName;
        query += " WHERE ";
        query += condition;
        console.log(query)
        connection.query(query, function (err, result) {
            if (err) throw err
            cb(result)
        })
    }
}

module.exports = orm
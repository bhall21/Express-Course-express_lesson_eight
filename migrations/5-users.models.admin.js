'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "admin" from table "users"
 * addColumn "Admin" to table "users"
 *
 **/

var info = {
    "revision": 5,
    "name": "users.models.admin",
    "created": "2022-01-25T05:12:40.781Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["users", "admin"]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "Admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "defaultValue": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

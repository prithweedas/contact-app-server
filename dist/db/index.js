"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const sequelize = new Sequelize("contact_app", "postgres", "prithweedas", {
//   dialect: "postgres",
//   operatorsAliases: Sequelize.Op,
//   host: "localhost",
//   define: {
//     underscored: true
//   }
// })

var sequelize = new _sequelize2.default("testbata", "prithwee@prithwee", "Prith*977", {
  host: "prithwee.database.windows.net",
  dialect: "mssql",
  operatorsAliases: _sequelize2.default.Op,
  dialectOptions: {
    encrypt: true
  }
});

var models = {
  User: sequelize.import("./user.js"),
  Contact: sequelize.import("./contact.js")
};

(0, _keys2.default)(models).forEach(function (modelName) {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = _sequelize2.default;
exports.default = models;
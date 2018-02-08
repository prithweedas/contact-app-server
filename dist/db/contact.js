"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Contact = sequelize.define("contact", {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  });

  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      foreignKey: {
        name: "owner",
        field: "owner"
      }
    });
  };

  return Contact;
};
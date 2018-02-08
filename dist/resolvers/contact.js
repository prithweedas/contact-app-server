"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _formatErrors = require("../formatErrors");

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _graphqlSubscriptions = require("graphql-subscriptions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubsub = new _graphqlSubscriptions.PubSub();

exports.default = {
  Query: {
    getAllContacts: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, _ref2) {
        var models = _ref2.models,
            user = _ref2.user;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return models.Contact.findAll({
                  where: { owner: user.id }
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function getAllContacts(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()
  },

  Subscription: {
    contactAdded: {
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return pubsub.asyncIterator("NEW_CONTACT_ADDED");
      }, function (payload, variables) {
        return payload.owner === variables.owner;
      })
    }
  },
  Mutation: {
    createContact: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, args, _ref4) {
        var models = _ref4.models,
            user = _ref4.user;
        var contact;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return models.Contact.create((0, _extends3.default)({}, args, { owner: user.id }));

              case 3:
                contact = _context2.sent;

                pubsub.publish("NEW_CONTACT_ADDED", {
                  contactAdded: contact.dataValues,
                  owner: user.id
                });
                return _context2.abrupt("return", {
                  ok: true
                });

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context2.t0)
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 8]]);
      }));

      return function createContact(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  }
};
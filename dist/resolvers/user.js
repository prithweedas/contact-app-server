"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _formatErrors = require("../formatErrors");

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _auth = require("../auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    getUser: function getUser(parent, _ref, _ref2) {
      var email = _ref.email;
      var models = _ref2.models;
      return models.User.findOne({ where: { email: email } });
    },
    getAllUsers: function getAllUsers(parent, args, _ref3) {
      var models = _ref3.models,
          user = _ref3.user;

      return models.User.findAll();
    },
    isAuthenticated: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, _ref5) {
        var models = _ref5.models,
            user = _ref5.user;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user.id) {
                  _context.next = 12;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return models.User.findOne({ where: { id: user.id } });

              case 4:
                return _context.abrupt("return", {
                  auth: true,
                  userId: user.id
                });

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  auth: false
                });

              case 10:
                _context.next = 13;
                break;

              case 12:
                return _context.abrupt("return", { auth: false });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined, [[1, 7]]);
      }));

      return function isAuthenticated(_x, _x2, _x3) {
        return _ref4.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    register: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, args, _ref7) {
        var models = _ref7.models;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return models.User.create(args);

              case 3:
                return _context2.abrupt("return", {
                  ok: true
                });

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context2.t0, models)
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 6]]);
      }));

      return function register(_x4, _x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }(),
    login: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, _ref9, _ref10) {
        var email = _ref9.email,
            password = _ref9.password;
        var models = _ref10.models,
            SECRET = _ref10.SECRET,
            SECRET2 = _ref10.SECRET2;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", (0, _auth.tryLogin)(email, password, models, SECRET, SECRET2));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function login(_x7, _x8, _x9) {
        return _ref8.apply(this, arguments);
      };
    }()
  },

  User: {
    contacts: function contacts(_ref11, args, _ref12) {
      var id = _ref11.id;
      var models = _ref12.models;
      return models.Contact.findAll({ where: { owner: id } });
    }
  }
};
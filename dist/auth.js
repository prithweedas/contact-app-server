"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshTokens = exports.createToken = exports.tryLogin = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tryLogin = exports.tryLogin = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email, password, models, SECRET, SECRET2) {
    var user, valid, _ref2, token, refreshToken, response;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return models.User.findOne({ where: { email: email }, raw: true });

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {
              ok: false,
              errors: [{
                path: "email",
                message: "Wrong Email"
              }]
            });

          case 5:
            _context.next = 7;
            return _bcrypt2.default.compare(password, user.password);

          case 7:
            valid = _context.sent;

            if (valid) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", {
              ok: false,
              errors: [{
                path: "password",
                message: "Wrong Password"
              }]
            });

          case 10:
            _context.next = 12;
            return createToken(user, SECRET, SECRET2);

          case 12:
            _ref2 = _context.sent;
            token = _ref2.token;
            refreshToken = _ref2.refreshToken;
            response = {
              ok: true,
              token: token,
              refreshToken: refreshToken
            };
            return _context.abrupt("return", response);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function tryLogin(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var createToken = exports.createToken = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user, SECRET, SECRET2) {
    var token, refreshToken;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _jsonwebtoken2.default.sign({
              user: _lodash2.default.pick(user, ["id", "username"])
            }, SECRET, {
              expiresIn: "1h"
            });

          case 2:
            token = _context2.sent;
            _context2.next = 5;
            return _jsonwebtoken2.default.sign({
              user: _lodash2.default.pick(user, ["id"])
            }, SECRET2, {
              expiresIn: "3d"
            });

          case 5:
            refreshToken = _context2.sent;
            return _context2.abrupt("return", { token: token, refreshToken: refreshToken });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createToken(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var refreshTokens = exports.refreshTokens = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(refreshToken, models, SECRET, SECRET2) {
    var userId, _ref5, _user, user, newToken;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = 0;
            _context3.prev = 1;
            _context3.next = 4;
            return _jsonwebtoken2.default.verify(refreshToken, SECRET2);

          case 4:
            _ref5 = _context3.sent;
            _user = _ref5.user;

            userId = _user.id;
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", {});

          case 12:
            if (userId) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", {});

          case 14:
            _context3.next = 16;
            return models.User.findOne({ where: { id: userId }, raw: true });

          case 16:
            user = _context3.sent;

            if (user) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt("return", {});

          case 19:
            _context3.next = 21;
            return createToken(user, SECRET, SECRET2);

          case 21:
            newToken = _context3.sent;
            return _context3.abrupt("return", {
              token: newToken.token,
              refreshToken: newToken.refreshToken,
              user: user
            });

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 9]]);
  }));

  return function refreshTokens(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
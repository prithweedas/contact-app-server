"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require("apollo-server-express");

var _graphqlTools = require("graphql-tools");

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _http = require("http");

var _graphql = require("graphql");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _db = require("./db");

var _db2 = _interopRequireDefault(_db);

var _auth = require("./auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 3001;
var endpointURL = "/graphql";
var SECRET = "xdtcfytuijnkoigkujhvwezrxdtcfygvhjplkwaerxdtcfgkmjiiugtd";
var SECRET2 = "fjfdkvnawoeknfejrkjmjsmvkjdafviabfvinasidjvjbfvjbjkssvjbhavhkah";

var addUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var token, _jwt$verify, user, refreshToken, newTokens;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers["x-token"];

            if (!token) {
              _context.next = 15;
              break;
            }

            _context.prev = 2;
            _jwt$verify = _jsonwebtoken2.default.verify(token, SECRET), user = _jwt$verify.user;

            req.user = user;
            _context.next = 15;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](2);
            refreshToken = req.headers["x-refresh-token"];
            _context.next = 12;
            return (0, _auth.refreshTokens)(refreshToken, _db2.default, SECRET, SECRET2);

          case 12:
            newTokens = _context.sent;

            if (newTokens.token && newTokens.refreshToken) {
              res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
              res.set("x-token", newTokens.token);
              res.set("x-refresh-token", newTokens.refreshToken);
            }
            req.user = _lodash2.default.pick(newTokens.user, ["id", "username"]);

          case 15:
            next();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 7]]);
  }));

  return function addUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, "schemas")));
var resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, "resolvers")));

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: resolvers
});

app.use("/static", _express2.default.static(_path2.default.join(__dirname, "static")));

app.use((0, _cors2.default)("*"));

app.use(addUser);

app.use(endpointURL, _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(function (req) {
  return {
    schema: schema,
    context: {
      models: _db2.default,
      SECRET: SECRET,
      SECRET2: SECRET2,
      user: req.user
    }
  };
}));

app.use("/graphiql", (0, _apolloServerExpress.graphiqlExpress)({
  endpointURL: endpointURL
}));

var server = (0, _http.createServer)(app);

_db2.default.sequelize.sync().then(function () {
  server.listen(PORT, function () {
    new _subscriptionsTransportWs.SubscriptionServer({
      execute: _graphql.execute,
      subscribe: _graphql.subscribe,
      schema: schema
    }, {
      server: server,
      path: "/subscriptions"
    });
  });
});
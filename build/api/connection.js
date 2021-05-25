"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connection = _mysql["default"].createConnection({
  host: '142.93.103.37',
  user: 'test_user',
  password: 'Eek6FEuxS7Y8IGlV@2021',
  database: 'testDB'
});

var _default = connection;
exports["default"] = _default;
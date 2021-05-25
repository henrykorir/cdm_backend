"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cdm_categories = function cdm_categories() {
  _connection["default"].connect();

  _connection["default"].query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });

  _connection["default"].end();
};

var _default = cdm_categories;
exports["default"] = _default;
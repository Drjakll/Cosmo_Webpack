"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_update_connections_js";
exports.ids = ["Development_Server_Requests_requests_connections_update_connections_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/update_connections.js":
/*!********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/update_connections.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      email,\n      connection_list\n    } = req.body;\n    let query = `update User_Accounts set connection_list = '${JSON.stringify(connection_list)}' where email = '${email}'`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error updating connection list\"\n        });\n      }\n      {\n        res.json({\n          message: \"Connection list successfully updated!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/update_connections.js?\n}");

/***/ })

};
;
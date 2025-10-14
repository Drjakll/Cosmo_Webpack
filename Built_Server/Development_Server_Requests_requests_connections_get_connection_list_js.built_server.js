"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_get_connection_list_js";
exports.ids = ["Development_Server_Requests_requests_connections_get_connection_list_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/get_connection_list.js":
/*!*********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/get_connection_list.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res, next) => {\n    let {\n      list_of_emails\n    } = req.body;\n    if (list_of_emails.length === 0) {\n      req.body.connection_list = [];\n      next();\n      return;\n    }\n    let query = `select * from User_Accounts where `;\n    for (let entry of list_of_emails) {\n      query += `email = '${entry}' or `;\n    }\n    query = query.slice(0, -4);\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error retrieving connection list\",\n          results: []\n        });\n        res.end();\n      } else {\n        req.body.connection_list = result;\n        next();\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/get_connection_list.js?\n}");

/***/ })

};
;
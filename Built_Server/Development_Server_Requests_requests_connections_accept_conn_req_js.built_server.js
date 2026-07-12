"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_accept_conn_req_js";
exports.ids = ["Development_Server_Requests_requests_connections_accept_conn_req_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/accept_conn_req.js":
/*!*****************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/accept_conn_req.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res, next) => {\n    let {\n      accept_user_acc,\n      user_acc\n    } = req.body;\n    let query = `select connection_list from User_Accounts where email = '${user_acc.email}'`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.end();\n      } else if (result.length > 0) {\n        let connection_list = JSON.parse(result[0].connection_list || \"{}\");\n        connection_list[accept_user_acc.email] = accept_user_acc;\n        query = `update User_Accounts set connection_list = '${JSON.stringify(connection_list)}' where email = '${user_acc.email}'`;\n        this.sql.query(query, (err, result) => {\n          if (err) {\n            console.log(err.sqlMessage);\n            res.end();\n          } else {\n            req.body[\"request_from\"] = accept_user_acc;\n            req.body[\"request_to\"] = user_acc;\n            if (next) {\n              next();\n            } else {\n              res.end();\n            }\n          }\n        });\n      } else {\n        res.end();\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/accept_conn_req.js?");

/***/ })

};
;
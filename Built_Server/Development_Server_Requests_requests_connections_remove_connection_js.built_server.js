"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_remove_connection_js";
exports.ids = ["Development_Server_Requests_requests_connections_remove_connection_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/remove_connection.js":
/*!*******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/remove_connection.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res, next) => {\n    let {\n      email,\n      to_remove_email\n    } = req.body;\n    let query = `select connection_list from User_Accounts where email = '${email}'`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({});\n        res.end();\n      } else if (result.length === 0) {\n        console.log(\"No user with email \" + email + \" found.\");\n        res.json({});\n        res.end();\n      } else {\n        let connection_list = JSON.parse(result[0].connection_list || \"{}\");\n        delete connection_list[to_remove_email];\n        query = `update User_Accounts set connection_list = '${JSON.stringify(connection_list)}' where email = '${email}'`;\n        this.sql.query(query, (err, result) => {\n          if (err) {\n            console.log(err.sqlMessage);\n            res.json({});\n            res.end();\n          } else if (next) {\n            //Remove the connection for the opposing account\n            req.body.email = to_remove_email;\n            req.body.to_remove_email = email;\n            next();\n          } else {\n            console.log(\"ended\");\n            res.json({});\n            res.end();\n          }\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/remove_connection.js?");

/***/ })

};
;
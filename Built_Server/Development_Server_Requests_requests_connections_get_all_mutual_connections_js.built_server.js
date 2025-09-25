"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_get_all_mutual_connections_js";
exports.ids = ["Development_Server_Requests_requests_connections_get_all_mutual_connections_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/get_all_mutual_connections.js":
/*!****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/get_all_mutual_connections.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      id\n    } = req.body;\n    let query = `\n            select\n                id,\n                first_name,\n                last_name,\n                profile_picture_link,\n                date_of_birth,\n                gender,\n                professions,\n                schools,\n                marital_status,\n                hobbies,\n                current_location,\n                connection_list\n            from\n                User_Accounts\n            where\n                json_contains_path(connection_list, 'one', '$.${id}')\n        `;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          \"message\": \"Error retreiving connection list\",\n          result: []\n        });\n      } else {\n        res.json({\n          \"message\": `Retreived ${result.length} results`,\n          result: result\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/get_all_mutual_connections.js?");

/***/ })

};
;
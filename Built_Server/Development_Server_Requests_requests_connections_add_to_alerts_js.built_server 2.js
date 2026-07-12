"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_add_to_alerts_js";
exports.ids = ["Development_Server_Requests_requests_connections_add_to_alerts_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/add_to_alerts.js":
/*!***************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/add_to_alerts.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      requirements\n    } = req.body;\n    let query = this.generate_insert_query(\"User_Accounts\", requirements, ['id', 'email', 'first_name', 'last_name', 'profile_picture_link', 'date_of_birth', 'gender', 'professions', 'schools', 'marital_status', 'hobbies', 'current_location', 'connection_list', 'online_ws_id']);\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          \"message\": \"Error retreiving connection list\",\n          result: []\n        });\n      } else {\n        res.json({\n          \"message\": `Retreived ${result.length} results`,\n          result: result\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/add_to_alerts.js?");

/***/ })

};
;
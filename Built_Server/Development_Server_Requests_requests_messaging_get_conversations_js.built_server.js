"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_get_conversations_js";
exports.ids = ["Development_Server_Requests_requests_messaging_get_conversations_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/get_conversations.js":
/*!*****************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/get_conversations.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      users\n    } = req.body;\n    let search_req = [{\n      key: \"users\",\n      value: users,\n      type: \"json\",\n      conjunc: \"json_search\",\n      logical: \"\"\n    }];\n    let query = this.generate_get_query(\"Messaging\", search_req, \"*\");\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: `Error searching for conversations`,\n          conversations: []\n        });\n      } else {\n        res.json({\n          message: `Found ${results.length} conversations`,\n          conversations: results\n        });\n      }\n      res.end();\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/get_conversations.js?\n}");

/***/ })

};
;
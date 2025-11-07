"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_update_conversation_js";
exports.ids = ["Development_Server_Requests_requests_messaging_update_conversation_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/update_conversation.js":
/*!*******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/update_conversation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      users,\n      room_tag,\n      messages,\n      seen_by\n    } = req.body;\n    let data_to_update = {\n      messages: messages,\n      users: users,\n      seen_by: seen_by || {}\n    };\n    let requirements = {\n      room_tag: room_tag\n    };\n    let query = this.generate_update_query(\"Messaging\", data_to_update, requirements);\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"An error occured while updating conversation\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully updated conversation\"\n        });\n      }\n      res.end();\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/update_conversation.js?\n}");

/***/ })

};
;
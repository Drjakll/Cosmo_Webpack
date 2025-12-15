"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_delete_conversation_js";
exports.ids = ["Development_Server_Requests_requests_messaging_delete_conversation_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/delete_conversation.js":
/*!*******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/delete_conversation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      conversation_id\n    } = req.body;\n    let query = `delete from Conversations where id = ${conversation_id}`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error deleting conversation\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully deleted the conversation\"\n        });\n      }\n      res.end();\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/delete_conversation.js?\n}");

/***/ })

};
;
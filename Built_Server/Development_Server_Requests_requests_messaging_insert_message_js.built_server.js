"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_insert_message_js";
exports.ids = ["Development_Server_Requests_requests_messaging_insert_message_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/insert_message.js":
/*!**************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/insert_message.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      conversation_id,\n      text,\n      sender_email,\n      timestamp\n    } = req.body;\n    text = text.replace(/\\\\/g, \"\\\\\\\\\").replace(/\\'/g, \"\\\\'\").replace(/\\\"/g, '\\\\\"');\n    let query = `\n            insert into\n                Message_Index(conversation_id, text, sender_email, created_on)\n            values (${conversation_id}, '${text}', '${sender_email}', ${timestamp});`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"An error occured while inserting the message\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully inserted the message\"\n        });\n      }\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/insert_message.js?\n}");

/***/ })

};
;
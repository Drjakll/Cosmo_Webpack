"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_create_conversation_js";
exports.ids = ["Development_Server_Requests_requests_messaging_create_conversation_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/create_conversation.js":
/*!*******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/create_conversation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      initiator_email,\n      oppose_email\n    } = req.body;\n    let time_joined = Date.now();\n    let data_to_insert = {\n      users: [{\n        email: initiator_email,\n        time_joined\n      }, {\n        email: oppose_email,\n        time_joined\n      }],\n      messages: [],\n      room_tag: `${initiator_email}${oppose_email}${Date.now()}`\n    };\n    let query = this.generate_insert_query(\"Messaging\", data_to_insert);\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"An error occured, cannot create conversation.\",\n          room_tag: null\n        });\n      } else {\n        res.json({\n          message: \"Successfully created conversation\",\n          room_tag: data_to_insert.room_tag\n        });\n      }\n      res.end();\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/create_conversation.js?\n}");

/***/ })

};
;
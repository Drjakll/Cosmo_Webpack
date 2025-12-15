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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res) => {\n    let {\n      initiator_email,\n      oppose_email\n    } = req.body;\n    let query = `insert into Conversations(chat_type) values('group')`;\n    let now = Date.now();\n    await this.sql.query(query, async (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error creating a conversation\",\n          room_tag: null\n        });\n        res.end();\n        return;\n      }\n      let values = [[initiator_email, result.insertId, now], [oppose_email, result.insertId, now]];\n      let q = `insert into Conversation_Participants(user_email, conversation_id, time_joined) values ?`;\n      await this.sql.query(q, [values], (err_i, results) => {\n        if (err_i) {\n          console.log(q, err_i.sqlMessage);\n        }\n      });\n      res.json({\n        message: \"Successfully created the conversation\",\n        room_tag: result.insertId\n      });\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/create_conversation.js?\n}");

/***/ })

};
;
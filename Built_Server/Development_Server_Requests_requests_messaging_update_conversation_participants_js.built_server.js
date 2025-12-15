"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_update_conversation_participants_js";
exports.ids = ["Development_Server_Requests_requests_messaging_update_conversation_participants_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/update_conversation_participants.js":
/*!********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/update_conversation_participants.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      new_users\n    } = req.body;\n    let insert_data = [];\n    let now = Date.now();\n    for (let user of new_users) {\n      let {\n        user_email,\n        conversation_id\n      } = user;\n      insert_data.push([user_email, conversation_id, now]);\n    }\n    let query = `insert into Conversation_Participants(sender_email, conversation_id, time_joined) values ?`;\n    this.sql.query(query, [insert_data], (err, results) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n      }\n      console.log(\"Done!\");\n    });\n    res.json({\n      message: \"Successfully finished!\"\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/update_conversation_participants.js?\n}");

/***/ })

};
;